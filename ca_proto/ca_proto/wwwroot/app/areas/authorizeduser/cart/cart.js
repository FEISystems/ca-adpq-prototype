(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, shoppingCartService, loginService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Cart";
        model.products = [];
        model.qtyOptions = [0,1,2,3,4,5,6];
        model.cartTotal = 0;
        model.cart = {};



        model.getActiveCart = function () {
            shoppingCartService.getActiveCart();
        };

        model.getActiveCart();

        $scope.updateCart = function() {
            for (let item of model.cart.Items) {
                shoppingCartService.updateCart( { "ShoppingCartItemId" : item.Id, "Quantity" : item.Quantity } );
            }
        }


        $scope.removeFromCart = function(itemId) {
             //model.removeCartItem(itemId);
        }

        model.removeCartItem = function (itemId) {
            shoppingCartService.removeCartItem(itemId);
        };  


        model.getProduct = function (productId) {
            inventoryService.getProduct(productId);
        };  


        $scope.removeThisItem = function (itemId) {
            model.removeCartItem(itemId)
        }

        $scope.proceedToCheckOut = function() {
            $location.path("user/checkout");
        }


        messageService.subscribe('getActiveCartSuccess', function (response) {
            model.cart = response;
            model.cartItems =[];
            model.products = [];
            model.cartItems = model.cart.Items;
            for (let product of model.cart.Items) {                
                model.getProduct(product.ProductId);
            }
            for (let item of model.cartItems) {
                model.cartTotal += item.Price * item.Quantity;
            }
        })

        messageService.subscribe('getActiveCartFailure', function (response) {
            model.cart = [];
        })


        messageService.subscribe('getProductSuccess', function (response) {
            model.products.push(response);
        })

        messageService.subscribe('getProductFailure', function (response) {
            model.product = [];
        })

        messageService.subscribe('updateCartSuccess', function (response) {
            model.cart = response;
            model.cartItems =[];
            model.products = [];
            model.cartItems = model.cart.Items;
            for (let product of model.cart.Items) {                
                model.getProduct(product.ProductId);
            }
            
        })

        messageService.subscribe('updateCartFailure', function (response) {
            model.product = [];
        })


        messageService.subscribe('removeCartItemSuccess', function (response) {
            model.cart = response;
            model.cartItems =[];
            model.products = [];
            model.cartItems = model.cart.Items;
            for (let product of model.cart.Items) {                
                model.getProduct(product.ProductId);
            }
        })

        messageService.subscribe('removeCartItemFailure', function (response) {
            model.product = {};
        })


    };

    module.component("cart", {
        templateUrl: "app/areas/authorizeduser/cart/cart.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "shoppingCartService", "loginService", "inventoryService", controller],
        bindings : {
            item : "="
        }

    });
}())