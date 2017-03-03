(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, $element, $rootScope, $sessionStorage, compareService, messageService, growl) {
        var model = this;
        model.products = [];
        model.productId = $scope.productId;


        var updateCheckboxes = function () {
            if ($sessionStorage.compareList) {
                if ($.inArray(model.productId, $sessionStorage.compareList) > -1) {
                    $($element).find("input").prop('checked', true);
                } else {
                    $($element).find("input").prop('checked', false);
                }
            } else {
                $($element).find("input").prop('checked', false);
            }
        }

        updateCheckboxes();

        model.clearAll = function () {
            compareService.clearAllCompareItems();
            console.log("hey");
        }


        $($element).find("input").on("change", function () {
            var checkbox = this;
            if ($(checkbox).is(":checked")) {
                if (!$sessionStorage.compareList) {
                    $sessionStorage.compareList = [];
                }
                if (!($.inArray(model.productId, $sessionStorage.compareList) > -1) && $sessionStorage.compareList.length < 4) {

                    compareService.addCompareItem(model.productId);
                } else {
                    $($element).find("input").prop('checked', false);
                    //alert("Only 4 items can be compared at a time.");
                    growl.warning("<strong>Only 4 items can be compared at a time. <a ng-cllick='model.clearAll()'>Clear all</a></strong>");
                }

            } else {
                compareService.removeCompareItem(model.productId);
            }
        });

        $rootScope.$on("updateCheckboxes", function (product) {
            updateCheckboxes();
        });
    };

    module.directive("compareProductButton", function () {
        return {
            templateUrl: 'app/views/shared/components/compareproduct-button/compareproduct-button.component.html',
            controller: ["$scope", "shoppingCartService", "$element", "$rootScope", "$sessionStorage", "compareService", "messageService", "growl", controller],
            replace: true,
            scope: { productId: '=' }
        }
    });

}())