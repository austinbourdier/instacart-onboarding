(function() {
    'use strict';

    angular
        .module('apply')
        .controller('BackgroundCheckController', BackgroundCheckController);

    function BackgroundCheckController($log, $scope, $state, $stateParams, $rootScope, applicationRepository, authService, Session, REDIRECT) {
        var vm = this;

        vm.next = next;
        vm.currentUser = $stateParams.currentUser;
        vm.showConsentError = false;

        function next () {
            if(vm.currentUser.backgroundCheckConsentGiven) {
                applicationRepository.update(vm.currentUser._id,
                {
                    currentStep: 'apply.confirmed',
                    backgroundCheckConsentGiven: true
                })
                .then(function (application) {
                    $state.go('apply.confirmed', {currentUser: application.data});
                })
                .catch(function (err) {
                    console.log(err)
                })
            } else {
                vm.showConsentError = true;
            }
        }
    };

})();
