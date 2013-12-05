var mongoose = require('mongoose');

exports.mongo = function (api, next) {

  var config = api.configData.mongo;
  var uri = generateMonogURI(config);

  api.mongo = {};

  /**
   * _start will be called just before the server boots.
   * https://github.com/evantahler/actionHero/wiki/Initializers#_start
   *
   * @param api
   * @param next
   * @private
   */
  api.mongo._start = function (api, next) {
    api.log('MongoDB start', 'debug');

    mongoose.connect(uri, function (err) {
      if (err) {
        api.log('MongoDB fails to connect to ' + uri, 'error');
        return;
      }
      api.log('MongoDB connected to ' + uri, 'debug');
      next();
    });
  }

  /**
   * _teardown will be called when the server is restarted or shutdown.
   * https://github.com/evantahler/actionHero/wiki/Initializers#_teardown
   *
   * @param api
   * @param next
   * @private
   */
  api.mongo._teardown = function (api, next) {
    api.log('MongoDB teardown', 'debug');

    mongoose.disconnect(function (err) {
      if (err) {
        api.log('MongoDB disconnect failed', 'error');
        return;
      }
      api.log('MongoDB connection closed', 'debug');
      return next();
    });
  };

  next();
};

/**
 * Generates a mongo uri from the given object
 *
 * @param option
 * @example
 *
 * var option = {
 *   host: 'localhost',
 *   port: 27017,
 *   username: null,
 *   password: null,
 *   database: 'test'
 * }
 * generateMonogURI(options); // mongodb://localhost:27017/test
 *
 * @returns {string}
 */
function generateMonogURI(option) {
  option.host = option.host || 'localhost';
  option.port = option.port || 27017;
  option.username = option.username || '';
  option.password = option.password || '';
  option.database = option.database || 'test';

  var login = '';
  if (option.username && option.password) {
    auth = obj.username + ':' + obj.password + '@'
  }
  return 'mongodb://' + login + option.host + ':' + option.port + '/' + option.database;
};