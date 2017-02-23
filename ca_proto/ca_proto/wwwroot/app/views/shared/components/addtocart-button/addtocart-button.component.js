(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService) {
        var model = this;
        model.productId = $scope.product.Id
        model.qty = 1;
        

        $scope.addToCart = function () {
            shoppingCartService.addProductToCart({"ProductId" : model.productId, "Quantity" : model.qty});
        }


    };

    module.directive("addToCartButton", function () {
        return {
            template: '<button class="usa-button-secondary" ng-click="addToCart()">Add to Cart</button>',
            controller: ["$scope", "shoppingCartService", controller],
            replace: true,
            scope: { product: '=' }
        }
    });

}())