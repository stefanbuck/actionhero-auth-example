exports.action = {
  name: "authenticatedAction",
  description: "authenticatedAction",
  inputs: {
    required: [],
    optional: []
  },
  blockedConnectionTypes: [],
  outputExample: {},
  run: function (api, connection, next) {
    api.session.checkAuth(connection, function (session) {
      if (session.actionCounter == null) {
        session.actionCounter = 0;
      }
      session.actionCounter++;
      connection.response.authenticated = true;
      connection.response.session = session;
      api.session.save(connection, session, function () {
        next(connection, true);
      });
    }, next);
  }
};