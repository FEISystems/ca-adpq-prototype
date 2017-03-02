(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, messageService, $timeout) {
        var model = this;
        model.productId = $scope.product.Id;
        model.qty = 1;
        $scope.showAddButton = true;


        $scope.addToCart = function () {
            shoppingCartService.addProductToCart({ "ProductId": model.productId, "Quantity": model.qty });
        }


        shoppingCartService.getActiveCart();

        messageService.subscribe("getActiveCartSuccess", function (response) {
            if (response) {
                model.cart = {};
                model.cart = response;
                model.cartItems = model.cart.Items;

                for (var i = 0; i < model.cartItems.length; ++i) {
                    var cartItem = model.cartItems[i];
                    var productId = parseInt(model.productId);

                    if (productId === cartItem.ProductId) {
                        $scope.showAddButton = false;

                        // $timeout(function () {
                        //     $scope.$apply();
                        // });
                    }

                }

            }

        })


        messageService.subscribe("addProductToCartSuccess", function (response) {
            shoppingCartService.getActiveCart();
            $timeout(function () {
                $scope.$apply();
            });
        })


    };

    module.directive("addToCartButton", function () {
        return {
            templateUrl: 'app/views/shared/components/addtocart-button/addtocart-button.component.html',
            controller: ["$scope", "shoppingCartService", "messageService", "$timeout", controller],
            replace: true,
            scope: { product: '=' }
        }
    });

}())