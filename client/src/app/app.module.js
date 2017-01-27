(function() {
    'use strict';

    angular
        .module('app', [
            'ngAnimate',
            'ngTouch',
            'ngSanitize',
            'ngMessages',
            '720kb.datepicker',
            'ui.router',
            'xeditable',
            'ngMask',
            'uiSwitch',
            'ui.slimscroll',
            'ngAutocomplete',
            'ui-notification',
            'LocalStorageModule',
            'ngFileUpload',
            'ncy-angular-breadcrumb',
            'mgcrea.ngStrap',
            'ui.bootstrap',
            'smart-table',
            'angular-flot',
            'com.2fdevs.videogular',
            'ui.validate',
            // setup
            'app.env',
            'app.directives',
            'app.filters',
            'app.services',
            // login
            // apply
            'apply',
            //'funnel',
            'funnel',
            // main
            'main',
            'main.home'
        ]);
})();
