(function() {
    'use strict';

    angular
        .module('apply')
        .controller('BasicInformationController', BasicInformationController);

    function BasicInformationController($log, $scope, $state, $stateParams, $rootScope, authService, applicationRepository, formsService, Session, REDIRECT) {
        var vm = this;

        vm.next = next
        vm.currentUser = $stateParams.currentUser;


        function next () {
            applicationRepository.update(vm.currentUser._id, {currentStep: 'apply.background-check'})
                .then(function (application) {
                    $state.go('apply.background-check', {currentUser: application.data});
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

    };

})();
