(function() {
    'use strict';

    angular
        .module('app')
        .constant('ENABLE_SOCIAL', {
            facebook: false,
            google: false
        })
        //.constant('REQUIRE_ACCOUNT_VERIFICATION', true)
        .constant('REDIRECT', {
            HOME:                   'main.home',
            BUILDING_MANAGER:       'building_manager',
            LOGIN:                  'login',
            SIGNUP:                 'signup',
            ADMIN:                  'admin.dashboard',
            ACCOUNT:                'admin.account',
            INVITE_PERSONNEL:       'onboarding.invite-personnel',
            REGISTER_BUILDING:      'onboarding.register-building',
            DEFINE_BUILDING:        'onboarding.define-building',
            ADD_FIRST_RESPONDERS:   'onboarding.add-first-responders',
            ADD_TRADE_EXPERTS:      'onboarding.add-trade-experts',
            ADD_OCCUPANTS:          'onboarding.add-occupants',
            FINISHED:               'onboarding.finished'
        })
        .constant('USER_ROLES', {
            ADMIN:                 'Admin',
            BUILDING_MANAGER:      'Building Manager',
            TRADE_EXPERT:          'Trade Expert',
            FIRST_RESPONDER:       'First Responder',
            OCCUPANT:              'Occupant'
        })
        .constant('BUILDING_MANAGER_ROLES', {
            ADMIN:                  'Admin',
            MANAGER:                'Manager'
        })
        .constant('SIGNUP_TYPES', {
            REGISTER:      'Register',
            INVITE:        'Invite'
        })
        .constant('ONBOARDING_STEPS', {
            REGISTER_BUILDING:      'Register Building',
            DEFINE_BUILDING:        'Define Building',
            ADD_FIRST_RESPONDERS:   'Add First Responders',
            ADD_TRADE_EXPERTS:      'Add Trade Experts',
            ADD_OCCUPANTS:          'Add Occupants',
            FINISHED:               'Finished'
        })
        .factory('API', (function(ENV_VARS) {

            return {
                // controlled from /config/app.env-vars.json file
                BASE_URL:               ENV_VARS.apiUrl,

                ACCOUNT:               'account',
                ACTIVATE:               'user/activate',
                ADMIN:                 'admin',
                ADMINS:                 'auth-attempt',
                APPLICATION:            'application',
                BUILDING:              'building',
                BUILDING_CATEGORY:      'building-category',
                BUILDING_MANAGER:      'building-manager',
                BUILDING_MANAGER_COMPANY:'building-manager-company',
                CHECK_EMAIL:            'user/check-email',
                FACILITY:               'facility',
                FACILITY_CATEGORY:      'facility-category',
                FACILITY_INCIDENT:     'facility-incident',
                FACILITY_ITEM:         'facility-item',
                FACILITY_ITEM_INCIDENT:'facility-item-incident',
                FIRST_RESPONDER:       'first-responder',
                FIRST_RESPONDER_COMPANY:'first-responder-company',
                CONTACT:                'contact',
                LOGIN:                  'user/login',
                LOGIN_FORGOT:           'user/login/forgot',
                LOGIN_RESET:            'user/login/reset',
                LOGOUT:                 'user/logout',
                OCCUPANT:              'occupant',
                SESSION:               'session',
                SEND_ACTIVATION_EMAIL:  'user/send-activation-email',
                SIGNUP:                 'user/signup',
                TRADE_EXPERT:          'trade-expert',
                TRADE_EXPERT_COMPANY:   'trade-expert-company',
                TRADE_EXPERT_CATEGORY:'trade-expert-category',
                USER:                  'user',
                USER_MY:               'user/my',
                USER_MY_PASSWORD:      'user/my/password',
            }
        }))
        // .constant('AUTH_EVENTS', {
        //     loginSuccess:         'auth-login-success',
        //     loginFailed:          'auth-login-failed',
        //     logoutSuccess:        'auth-logout-success',
        //     sessionTimeout:       'auth-session-timeout',
        //     notAuthenticated:     'auth-not-authenticated',
        //     notAuthorized:        'auth-not-authorized'
        // })
        ;

})();
