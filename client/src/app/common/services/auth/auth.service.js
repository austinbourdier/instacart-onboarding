(function() {
    'use strict';

    angular
        .module('app.services.auth')
        .factory('authService', authService);

    function authService($log, $timeout, $q, $http, $state, $rootScope, localStorageService, Notification, Session, API, REDIRECT) {

        return {
            login: login,
            loginForgot: loginForgot,
            loginReset: loginReset,
            logout: logout,
            signup: signup,
            activate: activate,
            sendActivationEmail: sendActivationEmail,
            checkEmail: checkEmail,
            getSession: getSession,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        //////////////////////
        //  LOGIN
        //////////////////////
        function login(user) {

            return $http.post(API.BASE_URL + API.LOGIN, {
                    email: user.email,
                    password: user.password
                })
                .then(function(response) {

                    $log.debug('auth.service.login-success:\n', response);

                    //EXPL: login successful if there's a session in the response
                    if (response.data.session) {
                        Session.create(response.data);
                    }
                    else {
                        throw "The response did not contain a session.";
                    }

                    return response;
                })
                .catch(function(error) {
                    $log.error('auth.service.login-error:\n', error);
                    throw error;
                });

        }

        //////////////////////
        //  LOGIN FORGOT
        //////////////////////
        function loginForgot(email) {

            return $http.post(API.BASE_URL + API.LOGIN_FORGOT, { email: email })
                .then(function(response) {
                    $log.debug('auth.service.loginForgot-success:\n', response);
                    return response;
                })
                .catch(function(error) {
                    $log.error('auth.service.loginForgot-error:\n', error);
                    throw error;
                });
        }

        //////////////////////
        //  LOGIN RESET
        //////////////////////
        function loginReset(data) {

            return $http.post(API.BASE_URL + API.LOGIN_RESET, data)
                .then(function(response) {
                    $log.debug('auth.service.loginReset-success:\n', response);
                    return response;
                })
                .catch(function(error) {
                    $log.error('auth.service.loginReset-error:\n', error);
                    throw error;
                });
        }

        //////////////////////
        //  LOGOUT
        //////////////////////
        function logout() {

            // log user out if they exist in localstorage
            if (localStorageService.get('session')) {

                //$log.debug("localStorageService.get(session)", localStorageService.get("session"));

                return $http.delete(API.BASE_URL + API.LOGOUT)
                    .then(function(response) {

                        // call singleton to wipe session
                        Session.destroy();
                        // direct call to null token so user is unAuthenticated
                        // to pass route resolve on login route
                        Session.token=null;

                        // messaging
                        // $log.debug('logout.service-success:', response);
                        Notification.success("You've successfully logged out.");

                        // redirect
                        $state.go(REDIRECT.HOME);

                    }, function(error) {
                        // failure
                        $log.error('logout.service-error:', error);

                        // call singleton to wipe session
                        Session.destroy();
                        // direct call to null token so user is unAuthenticated
                        // to pass route resolve on login route
                        Session.token=null;

                        // redirect
                        $state.go(REDIRECT.LOGIN);
                    });
            }
            else {
                $log.debug("auth.service-logout: No session exists.");
                // redirect
                $state.go(REDIRECT.LOGIN);
            }
        }

        //////////////////////
        //  SIGNUP
        //////////////////////
        function signup(user, role, roleData, signupType) {

            var data = {
                user: user,
                role: role,
                roleData: roleData,
                signupType: signupType
            };

            var deferred = $q.defer();

            var promise = $http.post(API.BASE_URL + API.SIGNUP, data);

            //EXPL: use a timeout to delay activation response for better user experience
            $timeout(function() {
                promise
                    .then(function (response) {
                        $log.debug('auth.service.signup-success:\n', response);
                        deferred.resolve(response);
                    })
                    .catch(function(error) {
                        $log.error('auth.service.signup-error:\n', error);
                        deferred.reject(error);
                    });
            }, 1000);

            return deferred.promise;
        }

        //////////////////////
        //  ACTIVATE
        //////////////////////
        function activate(data) {

            var deferred = $q.defer();

            var promise = $http.post(API.BASE_URL + API.ACTIVATE, data);

            //EXPL: use a timeout to delay activation response for better user experience
            $timeout(function() {
                promise
                    .then(function (response) {
                        $log.debug("auth.service.activate-success:\n", response);
                        deferred.resolve(response);
                    })
                    .catch(function(error) {
                        $log.error('auth.service.activate-error:\n', error);
                        deferred.reject(error);
                    });
            }, 1000);

            return deferred.promise;
        }

        //////////////////////
        //  SEND ACTIVATION EMAIL
        //////////////////////
        function sendActivationEmail(email) {

            return $http.post(API.BASE_URL + API.SEND_ACTIVATION_EMAIL, {
                email: email
            })
                .then(function(response) {
                    $log.debug('auth.service.sendActivationEmail-success:\n', response);
                    return response;
                })
                .catch(function(error) {
                    $log.error('auth.service.sendActivationEmail-error:\n', error);
                    throw error;
                });
        }

        //////////////////////
        //  CHECK EMAIL
        //////////////////////
        function checkEmail(email) {

            return $http.post(API.BASE_URL + API.CHECK_EMAIL, {
                email: email
            })
                .then(function(response) {
                    $log.debug('auth.service.checkEmail-success:\n', response);
                    return response;
                })
                .catch(function(error) {
                    $log.error('auth.service.checkEmail-error:\n', error);
                    throw error;
                });
        }

        /////////////////////////////
        //  GET EXISTING SESSION
        /////////////////////////////
        function getSession() {

            //$log.debug("auth.service: getSession-check for session");
            //$log.debug('localStorageService.get(session):', localStorageService.get('session'));

            // get user from localstorage
            if (localStorageService.get('session')) {

                $log.debug("auth.service: getSession-session exists");

                // update session with local storage
                Session.update();
                //$log.debug("auth.service: getSession-updated session");
            }
            else {
                $log.debug("auth.service: getSession-NO session exists");
            }
        }

        //////////////////////
        //  isAUTHENTICATED
        //////////////////////
        function isAuthenticated() {
            // $log.debug("auth.service-isAuthenticated-Session.token:", Session.token);
            return !!Session.token;
        }


        //////////////////////
        //  isAUTHORIZED
        //////////////////////

        // pass role name to check against allowed from backend
        function isAuthorized(authorizedRoles) {
            // $log.debug("auth.service-isAuthenticated-Session.token:", Session);

            if (!angular.isArray(authorizedRoles)) {
                // converts if no brackets around role name in the route
                authorizedRoles = [authorizedRoles];
            }

            // if user is authed with session, convert roles object to array to be searched
            var userRole = Session.user ? Session.user.role : '';  // ES6 - works only in modern browsers

            // $log.debug(authorizedRoles, userRole);

            // compare the two role sets to see if we allow access to the route
            var foundRole = authorizedRoles.indexOf(userRole);

            //$log.debug("isAuthorized-Session.userRole:", Session.userRole);
            //$log.debug("isAuthorized-isAuthenticated:", isAuthenticated());
            //$log.debug("isAuthorized-authorizedRoles:", authorizedRoles);
            //$log.debug("isAuthorized-userRoles:", userRoles);
            //$log.debug("isAuthorized-foundRole?", foundRole);

            return (isAuthenticated() && foundRole > -1);
        }


    }
})();
