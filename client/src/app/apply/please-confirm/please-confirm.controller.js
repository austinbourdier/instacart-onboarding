(function() {
    'use strict';

    angular
        .module('apply')
        .controller('PleaseConfirmController', PleaseConfirmController);

    function PleaseConfirmController($log, $scope, $state, $stateParams, $rootScope, authService, applicationRepository, Session, REDIRECT) {
        var vm = this;
        vm.next = next;
        // init globals for app wide inheritance
        //vm.isAuthorized = authService.isAuthorized;
        console.log($stateParams)
        vm.currentUser = $stateParams.currentUser;

        function next () {
            applicationRepository.update(vm.currentUser._id, {currentStep: 'apply.confirmed'})
                .then(function (application) {
                    $state.go('apply.confirmed', {currentUser: application.data});
                })
                .catch(function (err) {
                    console.log(err)
                })
        };
    };

})();
