var User = require('../models/userModel.js');
var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'userAdd';
action.description = 'I will create an new user based on the given parameters';
action.inputs = {
  'required': ['email', 'password', 'firstName', 'lastName'],
  'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {
  "userCreated": true
}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
  User.findOne({email: connection.params.email}, function (err, result) {
    if (result) {
      connection.error = 'This email is already in use';
      next(connection, true);
      return;
    }

    if (connection.params.password.length < 6) {
      connection.error = 'password must be longer than 6 chars';
      next(connection, true)
      return;
    }

    var passwordSalt = api.utils.randomString(64);
    var passwordHash = api.caluculatePassowrdHash(connection.params.password, passwordSalt);
    var data = {
      email: connection.params.email,
      firstName: connection.params.firstName,
      lastName: connection.params.lastName,
      passwordSalt: passwordSalt,
      passwordHash: passwordHash
    };

    var user = new User(data);
    user.save(function (error) {
      if (error) {
        connection.error = error;
        next(connection, true);
        return;
      }
      connection.response.userCreated = true;
      next(connection, true);
    });
  })
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;