(function() {
    'use strict';

    angular
        .module('app.services.repositories')
        .factory('userRepository', function ($log, $q, API, restfulResourceHelper) {
            return restfulResourceHelper.generateCrudCallers(API.USER);
        });
})();

/*
 ** Factory for CRUDing API.USER
 */
