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
            var query = request.query;
            var start = new Date();
            var end = new Date();
            var timeDiffStart = Math.abs(new Date(query.start_date).getTime() - start.getTime());
            var timeDiffEnd = Math.abs(new Date(query.end_date).getTime() - end.getTime());
            var diffDaysStart = Math.ceil(timeDiffStart / (1000 * 3600 * 24));
            var diffDaysEnd = Math.ceil(timeDiffEnd / (1000 * 3600 * 24));
            start.setDate(start.getDate()-diffDaysStart);
            end.setDate(end.getDate()-diffDaysEnd);
            end.setHours(end.getHours()+12);
            Applications.aggregate([
            {
              $match:
                {
                  'timeApplied':
                    {
                      $gte:  start,
                      $lte:  end
                    }
                }
            },
            {
              $project:
                {
                  timeApplied: "$timeApplied",
                  workflow_status: "$workflow_status",
                  week: { $week: [ "$timeApplied" ] },
                  year: { $year: [ "$timeApplied" ] },
                  dayOfWeek:{$dayOfWeek:["$timeApplied"]},
                }
            },
            {
              $project:
                {
                  timeApplied: "$timeApplied",
                  workflow_status: "$workflow_status",
                  week:{$cond:[{$eq:["$dayOfWeek",1]},{$subtract:["$week",1]},'$week']},
                  year: { $year: [ "$timeApplied" ] }
                }
            }
            ], (err, documents) => {
              var documentsByWeek = _.groupBy(documents, function(app) { return app.week});
              Object.keys(documentsByWeek).forEach(function(week) {
                var beginningOfWeek = new Date('' + documentsByWeek[week][0].year + '-01-01');
                beginningOfWeek.setDate(beginningOfWeek.getDate() + ((7-beginningOfWeek.getDay())%7+1) % 7);
                var daysToAdd = (week * 7) - 7;
                beginningOfWeek.setDate(beginningOfWeek.getDate() + daysToAdd);
                var endOfWeek = new Date(beginningOfWeek);
                endOfWeek.setDate(endOfWeek.getDate() + 6);
                var weekFormatted = convertDate(beginningOfWeek) + '-' + convertDate(endOfWeek);
                var groupByWorkflowStatus = _.groupBy(documentsByWeek[week].slice(0), function(app) { return app.workflow_status})
                documentsByWeek[weekFormatted] = {};
                _.each(groupByWorkflowStatus, function(g, key) {
                  documentsByWeek[weekFormatted][key] = groupByWorkflowStatus[key].length;
                })
                delete documentsByWeek[week];
              })
              reply(documentsByWeek);
            })
          };

          server.route({
            method: 'GET',
            path: '/funnels.json',
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

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}
