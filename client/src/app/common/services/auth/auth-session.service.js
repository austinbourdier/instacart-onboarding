(function() {
    'use strict';

    angular
        .module('app.services.auth')
        .factory('Session', Session);

    //TODO: review if sessions are needed (both client side and server side)

    function Session($log, $http, localStorageService) {

        var session = {
            create: create,
            update: update,
            destroy: destroy,
        }

        function create(obj) {

            // save vars to keep user logged in between page refreshes
            localStorageService.set('session', {
                user:         obj.user
            });

            // set vars for session
            session.user =            obj.user;

            //$log.debug("Session.$http.defaults.headers.common.Authorization:", $http.defaults.headers.common.Authorization);
            //$log.debug("Session.session:", session);

        };

        function update(obj) {
            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.get('session').token;
            //$log.debug('auth-session-token:', token);

            // set vars for session on page refresh

            session.user =            localStorageService.get('session').user;

        }

        function destroy() {

            $log.debug('Session.destroy: clearing localstorage');
            // remove jwt token from header
            $http.defaults.headers.common.Authorization='';
            // remove user from local storage and clear http auth header
            localStorageService.remove('session');
            // unset session vars
            var session={};
        };

        return session;

    }
})();
