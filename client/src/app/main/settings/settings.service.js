(function() {
    'use strict';

    angular
        .module('main.settings')
        .factory('settingsService', settingsService);

    function settingsService($log, API, apiHelperService) {

        return {

            // GET
            getMy: getMy,

            // UPDATE
            updateMy: updateMy,

            // DELETE
            deleteById: deleteById

        };


        //////////////////////
        //  GET
        //////////////////////
        function getMy() {

            var req = {
                method: 'GET',
                url: API.ACCOUNT +'/my',
            };
            return apiHelperService.sendHTTPRequest(req);
        }

        //////////////////////
        //  UPDATE (PUT)
        //////////////////////
        function updateMy(account) {

            var req = {
                method: 'PUT',
                url: API.ACCOUNT +'/my',
                data: account.name
            };
            return apiHelperService.sendHTTPRequest(req);
        }

        //////////////////////
        //  DELETE
        //////////////////////
        function deleteById(account) {

            var req = {
                method: 'DELETE',
                url: API.ACCOUNT +'/'+ account.id
            };
            return apiHelperService.sendHTTPRequest(req);
        }
    }

})();

/*
 ** Factory for CRUDing User Settings
 */
