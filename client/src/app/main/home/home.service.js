(function() {
    'use strict';

    angular
        .module('main.home')
        .factory('homeService', homeService);

    function homeService($log, API, apiHelperService) {

        return {

            // GET
            getAll: getAll,
        };


        //////////////////////
        //  GET
        //////////////////////
        function getAll() {

            var req = {
                method: 'GET',
                url: API.VIDEOS,
            };
            return apiHelperService.sendHTTPRequest(req);
        }
    }

})();

/*
 ** Factory for fetching ALL Videos
 */
