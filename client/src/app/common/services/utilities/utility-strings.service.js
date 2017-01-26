'use strict';

angular.module('app.services.utility')
    .factory('stringHelper', function ($log) {
        return {
            toCamel:function(string){
                return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
            },
            toDash:function(string) {
                string.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
            }
        }
    });
