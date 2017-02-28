(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService) {
        var model = this;
        model.productId = $scope.product.Id;
        model.qty = "1";


        $scope.addToCart = function () {
            shoppingCartService.addProductToCart({"ProductId" : model.productId, "Quantity" : parseInt(model.qty)});
        }


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