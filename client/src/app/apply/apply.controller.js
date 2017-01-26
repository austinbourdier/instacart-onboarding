(function() {
    'use strict';

    angular
        .module('apply')
        .controller('ApplyController', ApplyController);

    function ApplyController($log, $state, $rootScope, applicationRepository, REDIRECT, Session) {

        var vm = this;

        vm.currentUser = Session.user;


        (function init() {
            if(vm.currentUser) {
                applicationRepository.get(vm.currentUser)
                    .then(function (application) {
                        console.log(application.data)
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
