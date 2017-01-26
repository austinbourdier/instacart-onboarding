(function() {
    'use strict';

    angular
        .module('main.home')
        .controller('HomeController', HomeController);

    function HomeController($log, $uibModal, $sce, homeService, flashService, $scope, $state, REDIRECT) {
        var vm = this;

        ///////////////////////////////////////
        //  VIDEO FEED - UPLOAD
        ///////////////////////////////////////
        vm.videos = [];
        vm.getVideoFeed = getVideoFeed;
        vm.uploadVideo = uploadVideo;


        (function init() {
            // getVideoFeed();
        })();


        function getVideoFeed() {

            vm.isDataLoading = false;

            homeService.getAll().then(function(response) {

                if (response.data) {
                    //$log.debug('RESPONSE.data', response.data);

                    // we need to convert urls to SAFE for vid display
                    _.forEach(response.data, function(item) {
                       vm.videos.push({
                           'id':    item._id,
                           'title': item.title,
                           'url':   $sce.trustAsResourceUrl(item.url)
                       });
                    });

                    // ensure the latest uploaded are at the top
                    vm.videos.reverse();

                    //$log.debug('vm.videos', vm.videos);

                    vm.isDataLoading = false;
                }
            });
        }

        function uploadVideo() {

            $log.debug("home.controller-upload()");

            $uibModal.open({
                    templateUrl: 'app/main/video-upload/video-upload.view.html',
                    controller: 'VideoUploadModalController',
                    backdrop: 'static'
                })
                .result.then(function(result) {

                    if (result) {

                        $log.debug('result', result);

                        result.url = $sce.trustAsResourceUrl(result.src);
                        vm.videos.unshift(result);
                        flashService.success('Video Successfully Added to Feed.');

                    }
                })
        }

    }

})();
