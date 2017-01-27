(function() {
    'use strict';

    angular
        .module('apply')
        .config(applyRouteConfig);

    function applyRouteConfig($stateProvider) {

        $stateProvider

            .state('funnel', {
                parent: "main",
                url: "funnels",
                templateUrl: "app/funnel/funnel.view.html",
                controller: 'FunnelController',
                controllerAs: 'vm',
                params: {
                    'start_date': '2014-12-01',
                    'end_date': '2014-12-28'
                }
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
