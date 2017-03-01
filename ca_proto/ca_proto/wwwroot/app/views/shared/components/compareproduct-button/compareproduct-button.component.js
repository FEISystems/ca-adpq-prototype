(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, $element, $rootScope, $sessionStorage, compareService, messageService) {
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


        $($element).find("input").on("change", function () {
            var checkbox = this;
            if ($(checkbox).is(":checked")) {
                if (!($.inArray(model.productId, $sessionStorage.compareList) > -1) && $sessionStorage.compareList.length < 4) {

                    compareService.addCompareItem(model.productId);

                } else {
                    $($element).find("input").prop('checked', false);
                    alert("Only 4 items can be compared at a time.");
                }

            } else {
                compareService.removeCompareItem(model.productId);
            }
        });

        //compareService.refreshCompareList();

        $rootScope.$on("updateCheckboxes", function(product){
            updateCheckboxes();
        });

        // messageService.subscribe("addCompareItemSuccess", function (response) {
        //     model.products = response;
        //     updateCheckboxes();
        // });

        // messageService.subscribe("removeCompareItem", function (response) {
        //     model.products = response;
        //     updateCheckboxes();
        // });

        // messageService.subscribe("clearCompareItems", function (response) {
        //     model.products = response;
        //     updateCheckboxes();
        // });

    };

    module.directive("compareProductButton", function () {
        return {
            template: '<div><input type="checkbox" id="compareItem{{$id}}"><label for="compareItem{{$id}}">Compare</label></div>',
            controller: ["$scope", "shoppingCartService", "$element", "$rootScope", "$sessionStorage", "compareService", "messageService", controller],
            replace: true,
            scope: { productId: '=' }
        }
    });

}())