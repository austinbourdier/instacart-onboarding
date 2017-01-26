(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('googlePlacesService', googlePlacesService);

    function googlePlacesService($log) {

        return {
            isValid: isValid,
            formatAdmin: formatAdmin
        };

        function isValid(data) {
            if (data) {
                //$log.debug('data', data);
                return true;
            }
            else {
                return false;
            }
        }

        function formatAdmin(data) {
            var formattedData = {};
            formattedData.streetNumber = '';
            formattedData.route = '';

            //set longitude and latitude
            formattedData.lat = data.geometry.admin.lat();
            formattedData.lng = data.geometry.admin.lng();

            //set the data in the form using the address components
            _.forEach(data.address_components, function(component) {
                if (_.includes(component.types, 'street_number')) {
                    formattedData.streetNumber = component.long_name;
                }
                if (_.includes(component.types, 'route')) {
                    formattedData.route = component.short_name;
                }
                if (_.includes(component.types, 'locality') && _.includes(component.types, 'political')) {
                    formattedData.city = component.long_name;
                }

                if (_.includes(component.types, 'administrative_area_level_1') && _.includes(component.types, 'political')) {
                    formattedData.state = component.short_name;
                }
                if (_.includes(component.types, 'postal_code')) {
                    formattedData.zip = component.short_name;
                }
            });

            if (formattedData.streetNumber || formattedData.route) {
                formattedData.address = formattedData.streetNumber + ' ' + formattedData.route;
            }
            else {
                formattedData.address = '';
            }

            return formattedData;
        }

    }
})();
