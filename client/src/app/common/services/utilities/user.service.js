(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('userService', userService);

    function userService($log, API, apiHelperService, userRepository, $rootScope) {

        return {

            // GET
            getByEmail: getByEmail,
            getMy: getMy


        };



        //////////////////////
        //  GET
        //////////////////////
        function getByEmail(email) {

            $log.debug("user-data: getByEmail()");
            var req = {
                method: 'GET',
                url: API.BASE_URL + API.USER + '/get-by-email?email=' + email
            };
            return apiHelperService.sendHTTPRequest(req);
        }

        function getMy(params) {
            if (!params) {
                params = {};
            }
            if (!params.$embed) {
                params.$embed = ['admin','buildingManager.company','tradeExpert.company','firstResponder.company'];
            }
            return userRepository.find($rootScope.currentUser._id, params)
                .then(function(response) {
                    $log.debug("userService.getMy-success:\n", response);
                    return response;
                })
                .catch(function(error) {
                    $log.error("userService.getMy-error:\n", error);
                    throw error;
                })
        }

    }


})();

