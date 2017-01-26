(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    function runBlock($log, $http, $rootScope, $state, $stateParams, Notification, editableOptions, authService, localStorageService, REDIRECT) {

        // XEDITABLE THEME
        // set config option for ui
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

        // GET EXISTING SESSION
        // persist user session data on page refresh
        authService.getSession();

        // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        //     // get page title from state
        //     $rootScope.title = $state.current && $state.current.name ? $state.current.name : 'NYC is Running';
        //     // update active tab on state change
        //     // active tab from mean stack project
        //     $rootScope.activeTab = toState.data.activeTab;
        // });

    }

})();
