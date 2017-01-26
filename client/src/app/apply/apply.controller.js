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
                        $state.go(application.data[0].currentStep);
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            } else {
                $state.go('apply.begin-application');
            }

            // vm.step = ["","","","",""];
            // vm.icon = [
            //     "fa-building-o",
            //     "fa-building",
            //     "fa-cab",
            //     "fa-cogs",
            //     "fa-group"
            // ];
            // vm.title = [
            //     "Register Building",
            //     "Define Building",
            //     "Add First Responders",
            //     "Add Trade Experts",
            //     "Add Occupants"
            // ];
            // configProgressBar($state.current.name);

            // $rootScope.$on('$stateChangeStart', function(event, toState){
            //     configProgressBar(toState.name);
            // })
        })();


        /////////////////////////////
        //region Private Methods
        /////////////////////////////
        function configProgressBar(state) {
            vm.step = ["","","","",""];

            switch (state) {
                case REDIRECT.INVITE_PERSONNEL:
                    vm.invitePersonnel = true;
                    break;
                case REDIRECT.REGISTER_BUILDING:
                    setStep(0);
                    break;
                case REDIRECT.DEFINE_BUILDING:
                    setStep(1);
                    break;
                case REDIRECT.ADD_FIRST_RESPONDERS:
                    setStep(2);
                    break;
                case REDIRECT.ADD_TRADE_EXPERTS:
                    setStep(3);
                    break;
                case REDIRECT.ADD_OCCUPANTS:
                    setStep(4);
                    break;
                case REDIRECT.FINISHED:
                    vm.finished = true;
                    break;
            }
        }

        function setStep(step) {
            for (var i=0; i < step; i++) {
                vm.step[i] = "done";
            }
            vm.invitePersonnel = false;
            vm.finished = false;
            vm.step[step] = "current";
        }
        /////////////////////////////
        //endregion
        /////////////////////////////

    }

})();
