'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');

//TODO: replace common strings with "constants" enum (Ex: "Building Manager")

Dotenv.config({ silent: true });

const criteria = {
    env: process.env.NODE_ENV
};


const config = {
    $meta: 'This file configures the Instacart Onboarding API.',
    projectName: 'Instacart Onboarding API',
    websiteName: 'Instacart Onboarding',
    constants: {
        USER_ROLES: {
            ADMIN:                 'Admin',
            BUILDING_MANAGER:      'Building Manager',
            TRADE_EXPERT:          'Trade Expert',
            FIRST_RESPONDER:       'First Responder',
            OCCUPANT:              'Occupant'
        },
        APPLICATION_STEPS: { //corresponds to Angular state names
            BASIC_INFO_INITIATED:        'apply.basic-information',
            BASIC_INFO_SUBMITTED:        'apply.background-check',
            BACKGROUND_CHECK_OKAYED:     'apply.please-confirm',
            SUBMITTED:                  'apply.confirmed'
        },
        ONBOARDING_STEPS: {
            REGISTER_BUILDING:      'Register Building',
            DEFINE_BUILDING:        'Define Building',
            ADD_FIRST_RESPONDERS:   'Add First Responders',
            ADD_TRADE_EXPERTS:      'Add Trade Experts',
            ADD_OCCUPANTS:          'Add Occupants',
            FINISHED:               'Finished'
        },
        BUILDING_MANAGER_ROLES: {
            ADMIN:                  'Admin',
            MANAGER:                'Manager'
        },
        OCCUPANT_TYPES: {
            BUSINESS:               'Business',
            INDIVIDUAL:             'Individual'
        }
    },
    port: {
        web: {
            $filter: 'env',
            test: 9092,
            production: process.env.PORT,
            $default: 9002
        }
    },
    authStrategy: 'jwt',
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: '!k3yb04rdK4tz~4qu4~k3yb04rdd0gz!'
    },
    jwtSecret: {
        $filter: 'env',
        production: process.env.JWT_SECRET,
        $default: 'aStrongJwtSecret-#mgtfYK@QuRV8VMM7T>WfN4;^fMVr)y'
    },
    nodemailer: {
        $filter: 'env',
        local: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'nyc.building.management@gmail.com',
                pass: process.env.SMTP_PASSWORD
            }
        },
        production: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'nyc.building.management@gmail.com',
                pass: process.env.SMTP_PASSWORD
            }
        }
    },
    defaultEmail: {
        $filter: 'env',
        local: 'instacart.onboarding.management@gmail.com',
        development: 'instacart.onboarding.management@gmail.com',
        production: null
    },
    system: {
        fromAddress: {
            name: 'Instacart Onboarding',
            address: 'instacart.onboarding.management@gmail.com'
        },
        toAddress: {
            name: 'Instacart Onboarding',
            address: 'instacart.onboarding.management@gmail.com'
        }
    },
    clientURL: {
        $filter: 'env',
        local: 'http://localhost:3000',
        production: 'http://instacartonboarding.herokuapp.com', //need to configure this later...
        $default: 'http://localhost:3000'
    }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
