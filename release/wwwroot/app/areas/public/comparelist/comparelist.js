(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $rootScope, messageService, compareService, $sessionStorage, $timeout) {
        var model = this;
        model.provider = {};
        model.title = "Compare List";
        model.provider = {};
        model.scopeId = $scope.$id;


        this.$routerOnActivate = function () {


            compareService.refreshCompareList($scope.$id);

            model.removeFromCompare = function (productId) {
                compareService.removeCompareItem(productId, $scope.$id);
            };

            var processResponse = function (response) {
                if (response) {
                    if (response.scopeId == $scope.$id) {
                        model.products = response.compareProducts;
                        $timeout(function () {
                            $scope.$apply();
                        });
                    }
                } else {
                    model.products = {};
                    $timeout(function () {
                        $scope.$apply();
                    });
                }
            }


            messageService.subscribe('refreshCompareListSuccess', processResponse)

        }


    };

    module.component("compareList", {
        templateUrl: "app/areas/public/comparelist/comparelist.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$rootScope", "messageService", "compareService", "$sessionStorage", "$timeout", controller]

    });
}())