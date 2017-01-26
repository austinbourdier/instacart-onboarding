(function() {
    'use strict';

    angular
        .module('main')
        .controller('MainController', MainController);

    function MainController($log, $scope, $state, $rootScope, $q,
                            authService, Session, REDIRECT, ENV_VARS, userService) {
        var vm = this;
        // init globals for app wide inheritance
        $rootScope.currentUser = Session.user;

        //////////////////////
        //  GLOBAL ENV VARS
        //////////////////////

        // app name from gulp file json
        $rootScope.appName = ENV_VARS.appName;

        // app name from gulp file json
        $rootScope.appDesc = ENV_VARS.appDesc;

        //////////////////////
        //  GLOBAL MAIN VARS
        //////////////////////


        $rootScope.setCurrentUser = function(user) {
            $rootScope.currentUser = user;
        };

        $rootScope.refreshCurrentUser = function(params) {
            return userService.getMy(params)
                .then(function(response) {
                    $log.debug("MainController.refreshCurrentUser-success:\n", response);
                    $rootScope.currentUser = response.data;
                    return response.data;
                })
                .catch(function(error) {
                    $log.debug("MainController.refreshCurrentUser-error:\n", error);
                    throw error;
                });
        };

        $scope.isAuthenticated = function() {
            return authService.isAuthenticated();
        };

        $scope.isAuthorized = function(role) {
            return authService.isAuthorized(role);
        };

        $scope.isActive = function(stateLocation) {
            //$log.debug("main.controller-state:", $state.current.name);
            return $state.current.name === stateLocation;
        };


        //////////////////////
        //  LOGIN / LOGOUT
        //////////////////////
        vm.login = function() {
            $log.debug("main.controller-login()");
            authService.login();
        };
        vm.logout = function() {
            $log.debug("main.controller-logout()");
            authService.logout();
        };


        ///////////////////////////////
        //  BODY ID - CSS IDENTIFIER
        ///////////////////////////////
        vm.bodyId = '';
        // set unique id on body tag for any state we specify in routes files
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.data && toState.data.bodyId) {
                //$log.debug("main.controller: toState.data.bodyId",toState.data.bodyId);
                var bid = toState.data.bodyId;
                if (bid) {
                    vm.bodyId = toState.data.bodyId;
                    return;
                }
            }
            else {
                vm.bodyId = '';
            }
        });

    }

})();
