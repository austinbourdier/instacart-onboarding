(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('apiHelperService', apiHelperService);

    function apiHelperService($log, $http) {

        return {
            sendHTTPRequest: sendHTTPRequest
        };

        /**
         * Helper service in case request or response needs filtering.
         * @param req
         * @returns {*|Promise.<T>}
         */
        function sendHTTPRequest(req) {

            return $http(req)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error.data;
                });
        }

    }

})();
