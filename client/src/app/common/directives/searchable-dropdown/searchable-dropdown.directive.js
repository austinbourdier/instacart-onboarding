'use strict';

/**
 * searchable-dropdown
 * Creates an input field that displays a list of options to choose from based on the input text.
 */
angular.module('app.directives.searchable-dropdown')
    .directive('searchableDropdown', function ($log, $q) {
          return {
            restrict: 'E',
            scope: {
              repository: '=',
              limit: '=',
              onOptionSelect: '&',
              placeholderText: '=',
              selectedOption: '=',
              excludeOptions: '=',
              $embed: '=',
              $exclude: '=',
              $searchFields: '='
            },
            templateUrl: 'app/common/directives/searchable-dropdown/searchable-dropdown.template.html',
            controllerAs: 'vm',
            controller: function ($scope) {

              var vm = this;

              /////////////////////////////
              //region ViewModel Properties
              /////////////////////////////
              vm.placeholderText = $scope.placeholderText || "Start typing to select an option.";
              $scope.selectedOption; //EXPL: can't assign to vm since it breaks binding
              /////////////////////////////
              //endregion
              /////////////////////////////

              /////////////////////////////
              //region ViewModel Methods
              /////////////////////////////
              vm.autocompleteOptions = autocompleteOptions;
              vm.onOptionSelect = onOptionSelect;
              /////////////////////////////
              //endregion
              /////////////////////////////


              (function init() {
                $scope.$watch('$exclude', function() {
                  if ($scope.$exclude[0] && !_.isString($scope.$exclude[0])) {
                    excludeParam = $scope.$exclude.map(function(obj) {
                      return obj._id;
                    });
                  }
                  else {
                    excludeParam = $scope.$exclude;
                  }
                }, true)
              })();


              /////////////////////////////
              //region Private Properties
              /////////////////////////////
              var excludeParam = [];
              /////////////////////////////
              //endregion
              /////////////////////////////


              /////////////////////////////
              //region Private Methods
              /////////////////////////////
              function autocompleteOptions(term) {
                return $scope.repository.list({
                  $term: term == " " ? null : term,
                  $limit: $scope.vm.limit,
                  $embed: $scope.$embed,
                  $searchFields: $scope.$searchFields,
                  $exclude: excludeParam
                })
                    .then(function(result){
                      //EXPL: unwrap the results for the typeahead plugin.
                      return result.data;
                    });
              }

              function onOptionSelect(option){
                if ($scope.onOptionSelect()) {
                  $scope.onOptionSelect()(option);
                }
              }
              /////////////////////////////
              //endregion
              /////////////////////////////

            }
          }
        }
    )
    //EXPL: a directive that lists the dropdown options on the focus event
    .directive('typeaheadFocus', function () {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {

          //trigger the popup on 'click' because 'focus'
          //is also triggered after the item selection
          element.bind('click', function () {

            var viewValue = ngModel.$viewValue;

            //restore to null value so that the typeahead can detect a change
            if (ngModel.$viewValue == ' ') {
              ngModel.$setViewValue(null);
            }

            //force trigger the popup
            ngModel.$setViewValue(' ');

            //set the actual value in case there was already a value in the input
            ngModel.$setViewValue(viewValue || ' ');
          });

          //compare function that treats the empty space as a match
          scope.emptyOrMatch = function (actual, expected) {
            if (expected == ' ') {
              return true;
            }
            return actual.indexOf(expected) > -1;
          };
        }
      };
    });
