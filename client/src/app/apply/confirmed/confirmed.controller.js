(function() {
    'use strict';

    angular
        .module('apply')
        .controller('ConfirmedController', ConfirmedController);

    function ConfirmedController($log, $scope, $state, $stateParams, $rootScope, authService, Session, REDIRECT) {
        angular.element('#background4').css("height", "" + window.screen.height + "px");
        var vm = this;

        // init globals for app wide inheritance
        //vm.isAuthorized = authService.isAuthorized;
        vm.currentUser = $stateParams.currentUser;
        function next () {

        }
    };

})();
