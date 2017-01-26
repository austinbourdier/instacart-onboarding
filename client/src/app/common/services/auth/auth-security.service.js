(function() {
    'use strict';

    angular
        .module('app.services.auth')
        .factory('authSecurityService', authSecurityService);

    function authSecurityService($log, $timeout, $state, $q, $rootScope, authService,
                                 loginModalService, Notification, REDIRECT, USER_ROLES) {

        return {
            requireAdmin: requireAdmin,
            requireBuildingManager: requireBuildingManager,
            requireAuthenticatedUser: requireAuthenticatedUser,
            requireUnauthenticatedUser: requireUnauthenticatedUser
            //requireVerifiedUser: requireVerifiedUser,
            //requireUnverifiedUser: requireUnverifiedUser
        };


        /////////////////////////////
        //  SECURITY: AUTHORIZATION
        /////////////////////////////
        function requireAdmin() {
            authorizedRoles(USER_ROLES.ADMIN);
        }

        function requireBuildingManager() {
            authorizedRoles(USER_ROLES.BUILDING_MANAGER);
        }

        function authorizedRoles(authorizedRoles) {
            //$log.debug("auth.security: requireAdminUser");

            var defer = $q.defer();

            // check if user has role in list of authorized roles
            if (authService.isAuthorized(authorizedRoles)) {

                // user is authenticated and has the correct role - let them pass
                $log.debug("authSecurityService.authorizedRoles: user role-resolve");
                // $timeout(function() {
                //     $state.go(REDIRECT.ADMIN);
                // });
                defer.resolve();
            }
            else if (authService.isAuthenticated()) {
                // user is authenticated and does not have the admin role - redirect home
                $log.debug("authSecurityService.authorizedRoles: user DOES NOT HAVE authorized role");
                Notification.warning({message: "You don't have permission to access this area.", title: "Not Authorized"});

                // must be wrapped with timeout for async or will hang
                $timeout(function() {
                    $state.go(REDIRECT.HOME);
                });
                defer.reject();
            }
            else {
                $log.debug("authSecurityService.authorizedRoles: user is NOT AUTHED and DOES NOT HAVE authorized role");
                // user is not authenticated (therefore doesnt have a role)
                loginModalService.show();
                defer.reject();
            }

            return defer.promise;
        }

        //////////////////////////////////
        //  SECURITY: AUTHENTICATION
        //////////////////////////////////
        function requireAuthenticatedUser() {
            //$log.debug("auth.security: requireAuthenticatedUser");

            var defer = $q.defer();

            // check if user is authenticated
            if (authService.isAuthenticated()) {

                // user is authenticated and does not have the admin role - redirect home
                $log.debug("auth.security: requireAuthenticatedUser: user is authenitcated-resolve");
                defer.resolve();
            }
            else {
                $log.debug("auth.security: requireAuthenticatedUser: user not authenitcated-pop modal");
                loginModalService.show();
                defer.reject();
            }
            return defer.promise;
        }

        //////////////////////////////////
        //  SECURITY: UNAUTHENTICATED
        //////////////////////////////////
        function requireUnauthenticatedUser() {
            //$log.debug("auth.security: requireUnauthenticatedUser");

            var defer = $q.defer();

            if (authService.isAuthenticated()) {
                // user is authenticated - dont let them access the requested page - redirect
                $log.debug("auth.security: requireUnauthenticatedUser-redirect");
                Notification.warning({message: "You're Authenticated.", title: "Access Denied"});

                // must be wrapped with timeout for async or will hang
                $timeout(function() {
                    $state.go(REDIRECT.HOME);
                });
                defer.reject();
            }
            else {
                $log.debug("auth.security: requireUnauthenticatedUser-resolve");
                defer.resolve();
            }
            return defer.promise;
        }


        /** FUTURE FOR EMAIL / SIGNUP VERIFICATION

        /////////////////////////////
        //  SECURITY: VERIFIED
        /////////////////////////////
        function requireVerifiedUser() {
            $log.debug("auth.security: requireVerifiedUser");
            return {
                resolve: function() {
                    var deferred = $q.defer();
                    var unwatch = $rootScope.$watch('currentUser', function(currentUser) {
                        if (angular.isDefined(currentUser)) {
                            if (currentUser) {
                                deferred.resolve(currentUser);
                            }
                            else {
                                deferred.reject();
                                $state.go('user-login');
                            }
                            unwatch();
                        }
                    });
                    return deferred.promise;
                }
            }
        }

        /////////////////////////////
        //  SECURITY: UNVERIFIED
        /////////////////////////////
        function requireUnverifiedUser() {
            $log.debug("auth.security: requireUnverifiedUser");
            return {
                resolve: function() {
                    var deferred = $q.defer();
                    var unwatch = $rootScope.$watch('currentUser', function(currentUser) {
                        if (angular.isDefined(currentUser)) {
                            if (currentUser) {
                                deferred.resolve(currentUser);
                            }
                            else {
                                deferred.reject();
                                $state.go('user-login');
                            }
                            unwatch();
                        }
                    });
                    return deferred.promise;
                }
            }
        }
        **/

    }



})();

// This service provides guard methods to support AngularJS routes.
// You can add them as resolves to routes to require authorization levels before allowing a route change to complete
