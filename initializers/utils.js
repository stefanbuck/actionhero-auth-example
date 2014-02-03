var crypto = require('crypto');

exports.utils = function (api, next) {

  api.caluculatePassowrdHash = function (password, salt) {
    return crypto.createHash('sha256').update(salt + password).digest("hex");
  }

  next();
}