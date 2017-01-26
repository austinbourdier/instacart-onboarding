(function() {
    'use strict';

    angular
        .module('apply')
        .controller('BasicInformationController', BasicInformationController);

    function BasicInformationController($log, $scope, $state, $stateParams, $rootScope, authService, applicationRepository, formsService, Session, REDIRECT) {
        var vm = this;

        vm.next = next
        vm.currentUser = $stateParams.currentUser;
        vm.currentUser.basicInformationData = JSON.parse($stateParams.currentUser.basicInformationData);

        vm.stepBack = $stateParams.stepBack || performance.navigation.type === 1;
        // error handling utility
        vm.hasError = formsService.hasError;
        vm.showError = formsService.showError;
        vm.canSave = formsService.canSave;

        //check if stepback or reloaded page
        if(vm.stepBack) {
            vm.canSave(basicInformationSignupForm);
            $scope.$watch(angular.bind(this, function () {
              return this.currentUser.basicInformationData;
            }), function (newVal, oldVal) {
              var equal = angular.equals(newVal, oldVal);
              if(!equal) {
                vm.stepBack = false;
              }
            }, true);
        };

        function next () {
            applicationRepository.update(vm.currentUser._id,
                {
                    currentStep: 'apply.background-check',
                    //mongo won't accept a full object as a property, have to stringify form response and pass as a string
                    basicInformationData: JSON.stringify(vm.currentUser.basicInformationData)
                })
                .then(function (application) {
                    $state.go('apply.background-check', {currentUser: application.data});
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

    };

})();
