var action = {};

/////////////////////////////////////////////////////////////////////
// metadata
action.name = 'authenticatedAction';
action.description = 'The secret response';
action.inputs = {
  'required' : [],
  'optional' : []
};
action.blockedConnectionTypes = [];
action.outputExample = {}

/////////////////////////////////////////////////////////////////////
// functional
action.run = function(api, connection, next){
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
};

/////////////////////////////////////////////////////////////////////
// exports
exports.action = action;
