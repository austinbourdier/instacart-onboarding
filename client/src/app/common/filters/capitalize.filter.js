(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('capitalize', capitalize);

    function capitalize() {

        return function(input, scope) {
            if (input !=null) {
                if (input.length>=1) {
                    input = input.toLowerCase();
                    return input.substring(0, 1).toUpperCase() + input.substring(1);
                }
            }
        }
    }



})();
