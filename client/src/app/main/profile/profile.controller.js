(function() {
    'use strict';

    angular
        .module('main.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($log, $state, $sce, accountService, profileService, flashService, REDIRECT) {
        var vm = this;

        vm.videos = [];
        vm.getProfile = getProfile;
        //vm.updateProfile = updateProfile;
        //vm.deleteProfile = deleteProfile;

        vm.getVideoFeed = getVideoFeed;
        vm.formatTime = formatTime;


        (function init() {
            getProfile();
            getVideoFeed();
        })();


        function getProfile() {

            vm.isDataLoading = true;

            // get all accounts
            accountService.getMy().then(function(response) {

                if (response) {
                    $log.debug('profile.controller: accountService-getMy()', response);
                    vm.profileInfo = response;
                }
                vm.isDataLoading = false;
            });
        }

        function getVideoFeed() {

            vm.isDataLoading = false;

            profileService.getMy().then(function(response) {
                   
                $log.debug('profile.controller: profileService-getMy()', response);

                if (!response.error) {

                    // we need to convert urls to SAFE for vid display
                    _.forEach(response, function(item) {
                       vm.videos.push({
                           'id':    item._id,
                           'title': item.title,
                           'url':   $sce.trustAsResourceUrl(item.url)
                       });
                    });

                    // ensure the latest uploaded are at the top
                    vm.videos.reverse();

                    $log.debug('vm.videos', vm.videos);

                    vm.isDataLoading = false;
                }
            });
        }

        // function updateProfile() {
        //     UserService.Update(vm.user)
        //         .then(function () {
        //             FlashService.Success('User updated');
        //         })
        //         .catch(function (error) {
        //             FlashService.Error(error);
        //         });
        // }

        // function deleteProfile() {
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
