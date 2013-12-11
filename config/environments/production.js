// I override settings in ../config.js for this environment
// these changes will be merged on top of those in config.js

var config = {}

//

config.general = {
  developmentMode: false
}

config.servers = {
  web: {
    metadataOptions: {
      serverInformation: false,
      requesterInformation: false
    }
  }
}

var redisUrlObj = require('url').parse(process.env.REDISCLOUD_URL);
config.redis = {
    fake: false,
    host: redisUrlObj.hostname,
    port: redisUrlObj.port,
    password: redisUrlObj.auth.split(':')[1],
    options: null,
    database: 0
};

config.mongo = {
    uri: process.env.MONGOLAB_URI
};

//

exports.config = config;
