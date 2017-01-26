(function() {
    'use strict';

    angular
        .module('apply')
        .config(applyRouteConfig);

    function applyRouteConfig($stateProvider) {

        $stateProvider

            .state('funnel', {
                parent: "main",
                url: "funnel",
                templateUrl: "app/funnel/funnel.view.html",
                controller: 'FunnelController',
                controllerAs: 'vm',
                resolve: {
                    // authenticated: function(authSecurityService) {
                    //     return authSecurityService.requireAuthenticatedUser();
                    // }
                },
            })


            //////////////////////
            //  404
            //////////////////////
            .state('funnel.Notfound', {
                parent: 'funnel',
                url: '*path',
                templateUrl: 'app/main/main-404.view.html',
                title: 'Page Not Found',
                ncyBreadcrumb: {
                    skip: true
                },
            });

    }

})();
