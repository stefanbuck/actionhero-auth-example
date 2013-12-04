var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

var userSchame = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  passwordSalt: String,
  passwordHash: String
});

module.exports = mongoose.model('User', userSchame);