(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService) {
        var model = this;
        var product = $scope.product;
        model.productId = $scope.product.Id;
        model.qty = 1;

        model.isInvalidQuantity = function () {
            if (model.qty == null || isNaN(model.qty))
                return true;

            var theQuantity = Number(model.qty);

            return theQuantity <= 0;
        }


        $scope.addToCart = function () {
            shoppingCartService.addProductToCart({"ProductId" : model.productId, "Quantity" : parseInt(model.qty) });
        }
        $scope.onlyNumbers = /^\d+$/;

    };

    module.directive("addToCartQtyButton", function () {
        return {
            templateUrl: 'app/views/shared/components/addtocart-qty-button/addtocart-qty-button.html',
            controller: ["$scope", "shoppingCartService", controller],
            controllerAs : "model",
            replace: true,
            scope: { product: '=' }
        }
    });

}())