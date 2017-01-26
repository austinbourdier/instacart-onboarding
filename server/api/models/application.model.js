var Q = require('q');
const Config = require('../../config');
const APPLICATION_STEPS = Config.get('/constants/APPLICATION_STEPS');
var _ = require('lodash');

module.exports = function (mongoose) {
  var modelName = "application";
  var Types = mongoose.Schema.Types;
  var Schema = new mongoose.Schema({
    email: {
      type: Types.String,
      unique: true,
    },
    currentStep: {
      type: Types.String,
      enum: _.values(APPLICATION_STEPS),
      default: APPLICATION_STEPS.BASIC_INFO_INITIATED,
      required: true
    },
    basicInformationData: {
      type: Types.String
    },
    backgroundCheckConsentGiven: {
      type: Types.Boolean,
      default: false
    },
    timeCreated: {
      type: Types.Date
    }
  }, { collection: modelName });

  Schema.statics = {
    collectionName:modelName,
    routeOptions: {
      auth: null,
      alias: "application",
      extraEndpoints: [

      ]
    }
  };

  return Schema;
};
