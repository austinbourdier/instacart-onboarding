'use strict';
const Async = require('async');
const Boom = require('boom');
const Config = require('../../config');
const mongoose = require('mongoose');


const internals = {};


internals.applyStrategy = function (server, next) {
    next();
};




internals.preware = {
    ensureNotRoot: {
        assign: 'ensureNotRoot',
        method: function (request, reply) {

            if (request.auth.credentials.user.email === 'admin@scal.io') {
                const message = 'Not permitted for root user.';

                return reply(Boom.badRequest(message));
            }

            reply();
        }
    },
    ensureAdminGroup: function (groups) {

        return {
            assign: 'ensureAdminGroup',
            method: function (request, reply) {

                if (Object.prototype.toString.call(groups) !== '[object Array]') {
                    groups = [groups];
                }

                const groupFound = groups.some((group) => {

                    return request.auth.credentials.roles.admin.isMemberOf(group);
                });

                if (!groupFound) {
                    return reply(Boom.notFound('Permission denied to this resource.'));
                }

                reply();
            }
        };
    }
};


exports.register = function (server, options, next) {

    // if( Config.get('/authStrategy') === 'simple') {
    //     server.dependency('hapi-mongo-models', internals.applyStrategy);
    // } else {
    //     server.dependency(['hapi-mongo-models', 'hapi-auth-jwt2'], internals.applyJwtStrategy);
    // }

    server.dependency(['hapi-auth-jwt2'], internals.applyJwtStrategy);

    next();
};


exports.preware = internals.preware;


exports.applyJwtStrategy = internals.applyJwtStrategy;


exports.register.attributes = {
    name: 'auth'
};
