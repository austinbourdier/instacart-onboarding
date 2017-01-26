(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('flashService', flashService);

    function flashService($log, $rootScope) {

        var service = {};

        service.success = success;
        service.error = error;
        service.info = info;
        service.warning = warning;

        initService();

        return service;

        function initService() {
            
            $rootScope.$on('$stateChangeStart', function () {
                //$log.debug("clearFlashMessage");
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }


        function success(message, keepAfterLocationChange) {

            $rootScope.isDataLoading = false;

            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function error(message, keepAfterLocationChange) {

            $rootScope.isDataLoading = false;

            $rootScope.flash = {
                message: message,
                type: 'danger',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function info(message, keepAfterLocationChange) {

            $rootScope.isDataLoading = false;

            $rootScope.flash = {
                message: message,
                type: 'info',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function warning(message, keepAfterLocationChange) {

            $rootScope.isDataLoading = false;

            $rootScope.flash = {
                message: message,
                type: 'warning',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();

// This Service is used for Global Event Broadcasting