(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('panelService', panelService);

    function panelService($aside, $state, $stateParams, $log, $q, REDIRECT) {

        return {
            show: show,
            hide: hide
        }

        var aside = null;

        /////////////////////////
        //  SHOW PANEL (ASIDE)
        /////////////////////////
        function show(template, controller) {

            //$log.debug("panel.service: show");

            aside = $aside({
                templateUrl: template,
                controller: controller,
                controllerAs: 'vm',
                container: 'body',
                placement: 'right',
                keyboard: true,
                animation: 'am-slide-right',
                show: false,
                onHide: function() {
                    hide();
                }
            });

            return aside.$promise.then(aside.show); 
            
        }

        /////////////////////////
        //  CLOSE PANEL (ASIDE)
        /////////////////////////
        function hide() {
      
            if (aside) {
                //$log.debug("panel.service: hide");
                //aside = null;
                //aside.$promise.then(aside.destroy);
                aside.destroy();
                $state.go($state.current.parent);
            }

            
            
        }        
        
    }

})();
