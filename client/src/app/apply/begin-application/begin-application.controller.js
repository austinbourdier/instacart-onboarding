(function() {
    'use strict';

    angular
        .module('apply')
        .controller('BeginApplicationController', BeginApplicationController);

    function BeginApplicationController($log, $scope, $state, $stateParams, applicationRepository, $rootScope, authService, Session, REDIRECT, formsService) {
        var vm = this;
        vm.next = next;
        // init globals for app wide inheritance
        //vm.isAuthorized = authService.isAuthorized;
        vm.currentUser = Session.user;

        // error handling utility
        vm.hasError = formsService.hasError;
        vm.showError = formsService.showError;
        vm.canSave = formsService.canSave;
        vm.duplicateEmail = false;

        function next () {
            applicationRepository.get(vm.currentUser)
                .then(function (application) {
                    //Front-end check for no duplication of emails
                    if(!application.data.length) {
                        applicationRepository.create({email: vm.currentUser.email, currentStep: 'apply.basic-information'})
                        .then(function (application) {
                            Session.create({
                                user: {
                                    email: vm.currentUser.email
                                }
                            });
                            $state.go('apply.basic-information', {currentUser: application.data});
                        })
                        .catch(function (err) {

                        })
                    } else {
                        vm.duplicateEmail = true;
                    }
                })
                .catch(function (err) {

                })
        }
    };

})();
