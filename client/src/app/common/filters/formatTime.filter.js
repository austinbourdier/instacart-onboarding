(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('formatTime', formatTime);

    function formatTime() {

        return function(timestamp, replace) {
            if (!timestamp)
                return;
            
            var res = moment(timestamp).from();
            return replace ? res.replace('ago', replace) : res;
        }
    }



})();
