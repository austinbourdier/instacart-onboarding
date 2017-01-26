(function() {
    'use strict';

    angular
        .module('apply')
        .controller('ApplyController', ApplyController);

    function ApplyController($log, $state, $rootScope, applicationRepository, REDIRECT, Session) {

        var vm = this;

        vm.currentUser = Session.user;
        /////////////////////////////
        //region ViewModel Properties
        /////////////////////////////
        vm.progressValue = 0;
        vm.step = [];
        vm.icon = [];
        vm.title = [];
        vm.invitePersonnel = true;
        vm.finished = false;
        /////////////////////////////
        //endregion
        /////////////////////////////

        (function init() {
            if(vm.currentUser) {
                applicationRepository.get(vm.currentUser)
                    .then(function (application) {
                        $state.go(application.data[0].currentStep, {currentUser: application.data[0]});
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            } else {
                $state.go('apply.begin-application');
            }
        })();

    }

})();
