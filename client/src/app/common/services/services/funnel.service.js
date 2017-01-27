(function() {
    'use strict';

    angular
        .module('app.services.repositories')
        .factory('funnelService', function ($log, $q, API, restfulResourceHelper, $http) {
          var application = {
            retrieveFunnelData: retrieveFunnelData
          };

          function retrieveFunnelData (user) {
            var params = user;
            return $http.get(API.BASE_URL + API.FUNNEL, { params: params })
                      .then(function(response){
                          $log.debug("funnel-get response:\n", response);
                          return response;
                      })
                      .catch(function(error){
                          $log.error("funnel-get error:\n", error);
                          throw error;
                      });
          };

          return application;
        });
})();

