(function() {
    'use strict';

    angular
        .module('app.services.auth')
        .factory('authInterceptorService', authInterceptorService);

    function authInterceptorService($rootScope, $q, $log, $injector) {

        return {
            responseError: responseError
        };

        function responseError(response) {
            
            // 401 UNAUTHORIZED CAUGHT - No Valid Auth Credentials OR Session expired
            if (response.status === 401) {
                $log.debug("authInterceptor.service: 401: response:", response);

                var loginModalService = $injector.get('loginModalService');
                
                // Open modal for 401s
                loginModalService.show();
            }

            /* If not a 401, do nothing with this error.
             * This is necessary to make a `responseError`
             * interceptor a no-op. */
            return $q.reject(response);
        }
    };

})();

// This http interceptor listens for 401 authentication failures
// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
