(function() {
    'use strict';

    angular
        .module('main.video-upload')
        .factory('videoUploadService', videoUploadService);

    function videoUploadService($log, API, apiHelperService) {

        return {

            // post video
            create: create,

        };


        //////////////////////
        //  CREATE (POST)
        //////////////////////
        function create(title, url) {

            var req = {
                method: 'POST',
                url: API.VIDEOS,
                data: {
                    'title': title,
                    'url': url
                }
            };
            return apiHelperService.sendHTTPRequest(req);
        }

    }

})();

/*
 ** Factory for CRUDing Videos
 */
