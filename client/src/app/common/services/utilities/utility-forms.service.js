(function() {
    'use strict';

    angular
        .module('app.services.utility')
        .factory('formsService', formsService);

    function formsService($log) {
        var form = {};


        /////////////////////////////
        //region Notifications
        /////////////////////////////
        form.hasError = function(ngModelCtrl) {
            return ngModelCtrl.$dirty && ngModelCtrl.$invalid;
        };
        form.showError = function(ngModelCtrl, err) {
            return ngModelCtrl.$dirty && ngModelCtrl.$error[err];
        };
        form.showErrorOnSubmit = function(formCtrl, ngModelCtrl, err) {
            return ngModelCtrl.$dirty && ngModelCtrl.$error[err] && formCtrl.$submitted;
        };
        form.canSave = function(ngFormCtrl) {
            return ngFormCtrl.$dirty && ngFormCtrl.$valid;
        };
        form.refresh = function(ngFormCtrl) {
            ngFormCtrl.$setPristine();
        };
        /////////////////////////////
        //endregion
        /////////////////////////////


        /////////////////////////////
        //region Form Elements
        /////////////////////////////
        /**
         * Returns the exact option object so that the option is reflected in the view
         * @param currentOption
         * @param options
         * @returns {*}
         */
        form.getDropdownOption = function(currentOption, options) {
            if (!currentOption || !currentOption._id) {
                currentOption = options[0];
            }
            else {
                currentOption = options.find(function(option) {
                    return option._id === currentOption._id;
                })
            }
            return currentOption;
        };
        /////////////////////////////
        //endregion
        /////////////////////////////

        return form;
    }


})();
