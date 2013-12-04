var mongoose = require('mongoose');

exports.mongo = function (api, next) {

  var generateMonogURI = function (options) {
    options.host = options.host || 'localhost';
    options.port = options.port || 27017;
    options.username = options.username || '';
    options.password = options.password || '';
    options.database = options.database || 'test';

    var login = '';
    if (options.username && options.password) {
      auth = obj.username + ':' + obj.password + '@'
    }
    return 'mongodb://' + login + options.host + ':' + options.port + '/' + options.database;
  };

  var uri = generateMonogURI(api.configData.mongo);
  mongoose.connect(uri, function (err) {
    if (err) throw err;
    next();
  });
  
};