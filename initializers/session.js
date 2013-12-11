exports.session = function (api, next) {

  api.session = {
    prefix: "__session:",
    duration: 10 * 60 * 1000 // 10 minutes
  };

  api.session.save = function (connection, session, next) {
    var key = api.session.prefix + connection.id;
    api.cache.save(key, session, api.session.duration, function (error) {
      if (typeof next == "function") {
        next(error);
      }
      ;
    });
  }

  api.session.load = function (connection, next) {
    var key = api.session.prefix + connection.id;
    api.cache.load(key, function (error, session, expireTimestamp, createdAt, readAt) {
      if (typeof next == "function") {
        next(error, session, expireTimestamp, createdAt, readAt);
      }
    });
  }

  api.session.delete = function (connection, next) {
    var key = api.session.prefix + connection.id;
    api.cache.destroy(key, function (error) {
      next(error);
    });
  }

  api.session.generateAtLogin = function (connection, next) {
    var session = {
      loggedIn: true,
      loggedInAt: new Date().getTime(),
    }
    api.session.save(connection, session, function (error) {
      next(error);
    });
  }

  api.session.checkAuth = function (connection, successCallback, failureCallback) {
    api.session.load(connection, function (error, session) {
      if (session === null) {
        session = {};
      }
      if (session.loggedIn !== true) {
        connection.error = "You need to be authorized for this action";
        failureCallback(connection, true); // likley to be an action's callback
      } else {
        successCallback(session); // likley to yiled to action
      }
    });
  }

  next();
}