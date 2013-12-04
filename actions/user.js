var crypto = require('crypto');
var redisPrefix = "__users-";
var caluculatePassowrdHash = function (password, salt) {
  return crypto.createHash('sha256').update(salt + password).digest("hex");
}
var cacheKey = function (connection) {
  return redisPrefix + connection.params.email.replace("@", "_").replace(".", "_")
}

exports.userAdd = {
  name: "userAdd",
  description: "userAdd",
  inputs: {
    "required": ["email", "password", "firstName", "lastName"],
    "optional": []
  },
  blockedConnectionTypes: [],
  outputExample: {},
  run: function (api, connection, next) {
    if (connection.params.password.length < 6) {
      connection.error = "password must be longer than 6 chars";
      next(connection, true)
    } else {
      var passwordSalt = api.utils.randomString(64);
      var passwordHash = caluculatePassowrdHash(connection.params.password, passwordSalt);
      var user = {
        email: connection.params.email,
        firstName: connection.params.firstName,
        lastName: connection.params.lastName,
        passwordSalt: passwordSalt,
        passwordHash: passwordHash,
      };
      console.log(cacheKey(connection))
      api.cache.save(cacheKey(connection), user, function (error) {
        connection.error = error;
        connection.response.userCreated = true;
        next(connection, true);
      });
    }
  }
};

exports.logIn = {
  name: "logIn",
  description: "logIn",
  inputs: {
    "required": ["email", "password"],
    "optional": []
  },
  blockedConnectionTypes: [],
  outputExample: {},
  run: function (api, connection, next) {
    connection.response.auth = false;
    console.log(cacheKey(connection))
    api.cache.load(cacheKey(connection), function (err, user) {
      if (err) {
        connection.error = err;
        next(connection, true);
      } else if (user == null) {
        connection.error = "User not found";
        next(connection, true);
      } else {
        var passwordHash = caluculatePassowrdHash(connection.params.password, user.passwordSalt);
        if (passwordHash !== user.passwordHash) {
          connection.error = "incorrect password";
          next(connection, true);
        } else {
          api.session.generateAtLogin(connection, function () {
            connection.response.auth = true;
            next(connection, true);
          });
        }
      }
    });
  }
};