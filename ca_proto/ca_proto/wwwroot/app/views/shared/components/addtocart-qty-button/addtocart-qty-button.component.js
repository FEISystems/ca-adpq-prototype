(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, messageService, $timeout) {
        var model = this;
        model.productId = $scope.productId;
        model.qty = 1;
        model.cart = {};
        model.showAddButton = true;
        model.showUpdateButton = false;

        
        model.isInvalidQuantity = function () {
            if (model.qty == null || isNaN(model.qty))
                return true;

            var theQuantity = Number(model.qty);

            return theQuantity <= 0;
        }

        function processResponse(response) {
            if (response) {
                model.cart = {};
                model.cart = response;
                model.cartItems = model.cart.Items;

                for (var i = 0; i < model.cartItems.length; ++i) {
                    var cartItem = model.cartItems[i];
                    var productId = parseInt(model.productId);

                    if (productId === cartItem.ProductId) {
                        model.qty = cartItem.Quantity;
                        model.cartItemId = cartItem.Id;

                        model.showAddButton = false;
                        model.showUpdateButton = true;

                        $timeout(function () {
                            $scope.$apply();
                        });
                    }
                }

            }
        }

        $scope.addToCart = function () {
            shoppingCartService.addProductToCart({ "ProductId": model.productId, "Quantity": parseInt(model.qty) });
        }

        $scope.updateCart = function (response) {
            shoppingCartService.updateCart({ "ShoppingCartItemId": model.cartItemId, "Quantity": parseInt(model.qty) });
        }

        $scope.onlyNumbers = /^\d+$/;
        shoppingCartService.getActiveCart();

        messageService.subscribe("getActiveCartSuccess", processResponse)
        messageService.subscribe("addProductToCartSuccess", processResponse)
        messageService.subscribe("updateCartSuccess", processResponse)
    };

    module.directive("addToCartQtyButton", function () {
        return {
            templateUrl: 'app/views/shared/components/addtocart-qty-button/addtocart-qty-button.html',
            controller: ["$scope", "shoppingCartService", "messageService", "$timeout", controller],
            controllerAs: "model",
            replace: true,
            scope: { productId: '=' }
        }
    });

}())