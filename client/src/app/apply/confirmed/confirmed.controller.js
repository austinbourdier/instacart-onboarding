(function() {
    'use strict';

    angular
        .module('apply')
        .controller('ConfirmedController', ConfirmedController);

    function ConfirmedController($log, $scope, $state, $stateParams, $rootScope, authService, Session, REDIRECT) {
        var vm = this;

        // init globals for app wide inheritance
        //vm.isAuthorized = authService.isAuthorized;
        vm.currentUser = $stateParams.currentUser;
        function next () {

        }
    };

})();
