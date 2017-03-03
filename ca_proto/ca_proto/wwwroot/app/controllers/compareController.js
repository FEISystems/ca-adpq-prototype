(function () {

    var controller = function ($scope, $rootScope, messageService, compareService, $timeout) {
        var model = this;
        $scope.products = {};
        $scope.lengthCount = 0;

        compareService.refreshCompareList($scope.$id);

        model.removeFromCompare = function (productId) {
            compareService.removeCompareItem(productId, $scope.$id);
        };

        $scope.showDivider = function () {
            return $scope.products.length > 1;
        }

        var processResponse = function (response, scopeId) {
            if (scopeId) {
                compareService.refreshCompareList(scopeId);
            } else {
                compareService.refreshCompareList($scope.$id);
            }
        }

        var processRefreshResponse = function (response) {

            if (response) {
                $scope.products = {};
                $scope.products = response.compareProducts;
                $scope.lengthCount = response.lengthCount;
                // $timeout(function () {
                //     $scope.$apply();
                //     $scope.lengthCount = response.lengthCount;
                // }, 2000);
            } else {
                $scope.products = {};
                $scope.lengthCount = 0;
            }

        }


        messageService.subscribe('addCompareItemSucess', processResponse);
        $rootScope.$on('removeCompareItemSuccess', processResponse);
        messageService.subscribe('refreshCompareListSuccess', processRefreshResponse);

    }

    var module = angular.module("caWebApp");
    module.controller("CompareController", controller);
}())