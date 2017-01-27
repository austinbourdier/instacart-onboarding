(function() {
    'use strict';

    angular
        .module('funnel')
        .controller('FunnelController', FunnelController);

    function FunnelController($log, $state, $rootScope, applicationRepository, REDIRECT, Session, funnelService) {

        var vm = this;

        // vm.retrieveFunnelData = function () {
        //   funnelService.retrieveFunnelData().then(function(response) {
        //     alert(response)
        //   })
        // }


        (function init() {
          funnelService.retrieveFunnelData().then(function(response) {
            alert(response)
          })
        })();



    }

})();
