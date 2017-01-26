(function() {
    'use strict';

    angular
        .module('apply')
        .controller('BackgroundCheckController', BackgroundCheckController);

    function BackgroundCheckController($log, $scope, $state, $stateParams, $rootScope, applicationRepository, authService, Session, REDIRECT) {
        var vm = this;

        vm.next = next;
        vm.currentUser = $stateParams.currentUser;
        console.log($stateParams)
        function next () {
            applicationRepository.update(vm.currentUser._id, {currentStep: 'apply.please-confirm'})
                .then(function (application) {
                    $state.go('apply.please-confirm', {currentUser: application.data});
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    };

})();
