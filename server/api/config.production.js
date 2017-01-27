/**
 * config.local.js - Configuration settings for the local environment
 */
var config = {};
config.server = {};
config.mongo = {};

/**
 * Your app name goes here
 */
config.app = "Instacart Onboarding";

/**
 * Running the local environment
 */
config.apiVersion = "local";

/**
 * Server settings:
 * - config.server.port = 8124; (default)
 */
config.server.port = 9002;

/**
 * Mongo settings
 * - config.mongo.URI = 'mongodb://localhost/rest_hapi'; (local db, default)
 */
config.mongo.URI = 'mongodb://admin:admin@ds033259.mlab.com:33259/instacart-shopper-application';

/**
 * Authentication options:
 * - false (no authentication, default)
 * - "token" (token authentication)
 * @type {boolean}
 */
config.auth = false;

/**
 * Validation options:
 * default: true
 * NOTE: It is useful to disable query validation while testing with the hapi-swagger-docs
 * @type {boolean}
 */
config.enableQueryValidation = true;
config.enablePayloadValidation = true;
config.enableResponseValidation = true;

/**
 * Log level options:
 * - INTERNAL use it for logging calls and other internal stuff
 * - DEBUG recommended to use it for debugging applications
 * - NOTE development verbose information (default)
 * - INFO minor information
 * - LOG significant messages
 * - WARNING really important stuff
 * - ERROR application business logic error condition
 * - FATAL system error condition
 */
config.loglevel = "ERROR";

module.exports = config;
