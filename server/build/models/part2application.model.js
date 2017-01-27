var Q = require('q');
const Config = require('../../config');
var _ = require('lodash');

module.exports = function (mongoose) {
  var modelName = "part2application";
  var Types = mongoose.Schema.Types;
  var Schema = new mongoose.Schema({
    workflow_status: {
      type: Types.String
    },
    timeApplied: {
      type: Types.Date
    }
  }, { collection: modelName });

  Schema.statics = {
    collectionName:modelName,
    routeOptions: {
      auth: null,
      alias: "part2application",
      extraEndpoints: [
              //Logout Endpoint
        function (server, model, options, Log) {

          const Applications = mongoose.model('part2application');

          var collectionName = model.collectionDisplayName || model.modelName;

          Log.note("Generating Logout endpoint for " + collectionName);

          const funnelHandler = function (request, reply) {
            Applications.find({}, (err, documents) => {
              console.log(documents)
              reply(documents);
            })
          };

          server.route({
            method: 'GET',
            path: '/funnel.json',
            config: {
              handler: funnelHandler,
              auth: null,
              description: 'Funnel',
              tags: ['api', 'Funnel'],
              plugins: {
                'hapi-swagger': {
                  responseMessages: [
                    {code: 200, message: 'Success'},
                    {code: 400, message: 'Bad Request'},
                    {code: 404, message: 'Not Found'},
                    {code: 500, message: 'Internal Server Error'}
                  ]
                }
              }
            }
          });
        },
      ]
    }
  };

  return Schema;
};

function funnelHandler (request, reply) {

}
