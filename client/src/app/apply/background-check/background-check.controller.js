(function() {
    'use strict';

    angular
        .module('apply')
        .controller('BackgroundCheckController', BackgroundCheckController);

    function BackgroundCheckController($log, $scope, $state, $stateParams, $rootScope, applicationRepository, authService, Session, REDIRECT) {
        angular.element('#background3').css("height", "" + window.screen.height + "px");
        var vm = this;

        vm.next = next;
        vm.back = back;
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

        function back () {
            applicationRepository.update(vm.currentUser._id,
                    {
                        currentStep: 'apply.basic-information'
                    })
                    .then(function (application) {
                        $state.go('apply.basic-information', {currentUser: application.data, stepBack: true});
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
        }
    };

})();
