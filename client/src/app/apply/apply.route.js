(function() {
    'use strict';

    angular
        .module('apply')
        .config(applyRouteConfig);

    function applyRouteConfig($stateProvider) {

        $stateProvider

            .state('apply', {
                parent: "main",
                url: "apply",
                templateUrl: "app/apply/apply.view.html",
                controller: 'ApplyController',
                controllerAs: 'vm',
                resolve: {
                    // authenticated: function(authSecurityService) {
                    //     return authSecurityService.requireAuthenticatedUser();
                    // }
                },
            })

            .state('apply.begin-application', {
                parent: 'apply',
                // url: "/begin-application",
                templateUrl: "app/apply/begin-application/begin-application.view.html",
                controller: 'BeginApplicationController',
                controllerAs: 'vm',
                title: 'Begin Application'
            })

            .state('apply.basic-information', {
                parent: 'apply',
                // url: "/basic-information",
                templateUrl: "app/apply/basic-information/basic-information.view.html",
                controller: 'BasicInformationController',
                controllerAs: 'vm',
                title: 'Basic Information',
                params: {
                    'currentUser': null
                }
            })

            .state('apply.background-check', {
                parent: 'apply',
                // url: "/background-check",
                templateUrl: "app/apply/background-check/background-check.view.html",
                controller: 'BackgroundCheckController',
                controllerAs: 'vm',
                title: 'Background Check',
                params: {
                    'currentUser': null
                }
            })
            // .state('apply.please-confirm', {
            //     parent: 'apply',
            //     // url: "/please-confirm",
            //     templateUrl: "app/apply/please-confirm/please-confirm.view.html",
            //     controller: 'PleaseConfirmController',
            //     controllerAs: 'vm',
            //     title: 'Please Confirm',
            //     params: {
            //         'currentUser': null
            //     }
            // })
            .state('apply.confirmed', {
                parent: 'apply',
                // url: "/confirmed",
                templateUrl: "app/apply/confirmed/confirmed.view.html",
                controller: 'ConfirmedController',
                controllerAs: 'vm',
                title: 'Thank you!',
                params: {
                    'currentUser': null
                }
            })


            //////////////////////
            //  404
            //////////////////////
            .state('apply.Notfound', {
                parent: 'apply',
                url: '*path',
                templateUrl: 'app/main/main-404.view.html',
                title: 'Page Not Found',
                ncyBreadcrumb: {
                    skip: true
                },
            });

    }

})();
