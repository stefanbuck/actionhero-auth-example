
var User = require('../models/userModel.js');
var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'logIn';
action.description = 'logIn';
action.inputs = {
  'required' : ['email', 'password'],
  'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
  connection.response.auth = false;

  User.findOne({email: connection.params.email}, function (err, user) {
    if (err) {
      connection.error = err;
      next(connection, true);
    } else if (user == null) {
      connection.error = 'User not found';
      next(connection, true);
    } else {
      var passwordHash = api.caluculatePassowrdHash(connection.params.password, user.passwordSalt);
      if (passwordHash !== user.passwordHash) {
        connection.error = 'incorrect password';
        next(connection, true);
      } else {
        api.session.generateAtLogin(connection, function () {
          connection.response.auth = true;
          next(connection, true);
        });
      }
    }
  });
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;