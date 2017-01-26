(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider

        //////////////////////
        //  MAIN
        //////////////////////

        .state('main', {
            abstract: true,
            url: "/",
            templateUrl: "app/main/main.view.html",
            controller: 'MainController',
            data: {
                bodyId: 'main'
            }
        })

        .state('main.home', {
            url: "",
            templateUrl: "app/main/home/home.view.html",
            controller: 'HomeController',
            controllerAs: 'vm'
        })

        .state('main.about', {
            url: "about",
            templateUrl: "app/main/about/about.view.html",
            controller: 'AboutController',
            controllerAs: 'vm'
        })

        .state('main.contact', {
            url: "contact",
            templateUrl: "app/main/contact/contact.view.html",
            controller: 'ContactController',
            controllerAs: 'vm'
        })

        .state('main.profile', {
            url: "profile",
            templateUrl: "app/main/profile/profile.view.html",
            controller: 'ProfileController',
            controllerAs: 'vm'
        })

        .state('main.settings', {
            url: "settings",
            templateUrl: "app/main/settings/settings.view.html",
            controller: 'SettingsController',
            controllerAs: 'vm'
        })

        // 404
        .state('notfound', {
            parent: 'main',
            url: '*path',
            templateUrl: 'app/main/main-404.view.html',
            title: 'Page Not Found'
        });

    }

})();
