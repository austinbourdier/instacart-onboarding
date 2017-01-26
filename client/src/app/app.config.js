(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($logProvider, $locationProvider, $httpProvider, NotificationProvider, $modalProvider, $provide, ENABLE_SOCIAL, ENV_VARS) {

        // LOGGING (turn on/off globally)
        if (ENV_VARS.debug=="true") {
            $logProvider.debugEnabled(true);
        }
        else {
            $logProvider.debugEnabled(false);
        }

        // CLEAN URLS
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode({ enabled: true, requireBase: false });

        // AUTH INTERCEPTOR SERVICE (SNIFF FOR 401s)
        $httpProvider.interceptors.push('authInterceptorService');

        // UI-NOTIFICATION
        NotificationProvider.setOptions({
            startTop: 15,
            startRight: 20
        });

        // ANGULAR STRAP MODAL DEFAULTS
        angular.extend($modalProvider.defaults, {
            html: true
        });

        // SOCIAL LOGIN/AUTH/ CONFIG
        var setting = {
            'facebook': {
                text: 'Facebook',
                icon: 'fa-facebook-square',
                login: '/login/facebook',
                connect: '/account/settings/facebook/'
            },
            'google': {
                text: 'Google',
                icon: 'fa-google-plus-square',
                login: '/login/google',
                connect: '/account/settings/google/'
            }
        };

        var social = {};

        angular.forEach(ENABLE_SOCIAL, function(enable, key) {
            if (enable) {
                social[key] = setting[key];
            }
        });

        // programmatically set constant, 'SOCIAL', in config module
        $provide.constant('SOCIAL', social);


    }

})();
