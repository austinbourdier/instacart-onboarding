var Hapi = require('hapi'),
    Inert = require('inert'),
    Vision = require('vision'),
    HapiSwagger = require('hapi-swagger');
const Async = require('async');
var logging = require('loggin');
var config = require('./config');
var chalk = require('chalk');
var Q = require("q");

//TODO: make sure all functions return errors

var rootLogger = logging.getLogger(chalk.gray("app"));

rootLogger.logLevel = config.loglevel;

var logUtil = require('./utilities/log-util');

function appInit(){
  var logger = logUtil.bindHelper(rootLogger, 'appInit()');

  logUtil.logActionStart(logger, "Initializing Server");

  var server = new Hapi.Server();

  var config = require('./config');

  const Config = require('../config');

  var mongoose = require('./components/mongoose-init')(logger, config);

  var restHelperFactory = require('./utilities/rest-helper-factory');

  var generateModels = require('./models');

  generateModels(mongoose).then(function(models) {
    server.connection({
      port: config.server.port,
      routes: {
        cors: {
          additionalHeaders: ['X-Total-Count'],
          additionalExposedHeaders: ['X-Total-Count']
        }
      }
    });

    var swaggerOptions = {
      apiVersion: '1.0',
      documentationPath: '/'
    };


    server.register(require('./utilities/mailer'));

    server.register([
          Inert,
          Vision,
          {
            register: HapiSwagger,
            options: swaggerOptions
          }],
        function (err) {

          var restHelper = restHelperFactory(logger, mongoose, server);

          for (var modelKey in models) {//EXPL: generate endpoints for all of the models
            var model = models[modelKey];
            restHelper.generateRoutes(server, model, {models:models})
          }

          //EXPL: register additional endpoints
          if (models.user) {
            require('./token/token.routes')(server, models, logger);
          }


          server.start(function (err) {
            if (err) {
              console.log('error', err);
            }

            server.log('info', 'Server running at: ' + server.info.uri);

            logUtil.logActionComplete(logger, "Server Initialized", server.info);
          });
        });
  });


  return server;
}

module.exports = appInit();
