(function() {
    'use strict';

    angular
        .module('main.settings')
        .controller('SettingsController', SettingsController);

    function SettingsController($log, $state, settingsService, flashService, REDIRECT) {
        var vm = this;

        vm.settings = [];
        vm.getSettings = getSettings;
        //vm.updateSettings = updateSettings;
        //vm.deleteSettings = deleteSettings;
        vm.formatTime = formatTime;

        (function init() {
            return getSettings();
        })();


        function getSettings() {

            vm.isDataLoading = true;

            // get all accounts
            settingsService.getMy().then(function(response) {

                if (response) {
                    //$log.debug('RESPONSE', response);
                    vm.settings = response;
                }
                vm.isDataLoading = false;
            });
        }


        // function updateSettings() {
        //     UserService.Update(vm.user)
        //         .then(function () {
        //             FlashService.Success('User updated');
        //         })
        //         .catch(function (error) {
        //             FlashService.Error(error);
        //         });
        // }

        // function deleteSettings() {
        //     UserService.Delete(vm.user._id)
        //         .then(function () {
        //             // log user out
        //             $window.location = '/login';
        //         })
        //         .catch(function (error) {
        //             FlashService.Error(error);
        //         });
        // }


        function formatTime(timestamp, replace) {
            var res = moment(timestamp).from();
            return replace ? res.replace('ago', replace) : res;
        };
    }

})();
