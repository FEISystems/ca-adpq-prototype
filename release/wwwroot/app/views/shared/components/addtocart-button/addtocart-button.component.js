(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, messageService, $timeout) {
        var model = this;
        model.productId = $scope.product.Id;
        model.qty = 1;
        $scope.showAddButton = true;

        var myId = $scope.$id;
        $scope.addToCart = function () {
            shoppingCartService.addProductToCart({ "ProductId": model.productId, "Quantity": model.qty }, myId);
        }


        shoppingCartService.getActiveCart(myId);
        var listeners = [];
        function processCart(response)
        {
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
        };
        listeners.push(
            messageService.subscribe("getActiveCartSuccess", function (response) {
                if (response && response.sourceId == myId) {
                    processCart(response);
                }

            })
        );

        listeners.push(
            messageService.subscribe("addProductToCartSuccess", function (response) {
                if (response.sourceId != myId)
                    return;
                processCart(response);
                $timeout(function () {
                    $scope.$apply();
                });
            })
        );

        $scope.$on('$destroy', function () {
            angular.forEach(listeners, function (l)
            {
                l();
            });
        });
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