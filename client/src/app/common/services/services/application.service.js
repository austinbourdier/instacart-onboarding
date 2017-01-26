(function() {
    'use strict';

    angular
        .module('app.services.repositories')
        .factory('applicationRepository', function ($log, $q, API, restfulResourceHelper, $http) {
          var application = {
            get: get,
            create: create,
            update: update,
          };

          function get (user) {
            var params = user;
            return $http.get(API.BASE_URL + API.APPLICATION, { params: params })
                      .then(function(response){
                          $log.debug("application-get response:\n", response);
                          return response;
                      })
                      .catch(function(error){
                          $log.error("application-get error:\n", error);
                          throw error;
                      });
          };

          function create (user) {
            var payload = user;
            return $http.post(API.BASE_URL + API.APPLICATION, payload)
                      .then(function(response){
                          $log.debug("application-create response:\n", response);
                          return response;
                      })
                      .catch(function(error){
                          $log.error("application-create error:\n", error);
                          throw error;
                      });
          };

          function update (id, update) {
            return $http.put(API.BASE_URL + API.APPLICATION + '/' + id, update)
            $http.put(API.BASE_URL + resourceRoute + "/" + id, payload)
                      .then(function(response){
                          $log.debug("application-create response:\n", response);
                          return response;
                      })
                      .catch(function(error){
                          $log.error("application-create error:\n", error);
                          throw error;
                      });
          };

          return application;
        });
})();

