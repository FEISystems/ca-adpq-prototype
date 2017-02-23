(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, shoppingCartService, loginService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Checkout";
        model.products = [];
        model.cart = {};
        model.cartTotal = 0;

        
        model.getActiveCart = function () {
            shoppingCartService.getActiveCart();
        };

        model.getActiveCart();

        
        model.getProduct = function (productId) {
            inventoryService.getProduct(productId);
        };  

        $scope.backToCart = function() {
            $location.path("user/checkout");
        }

        $scope.showDivider = function() {
            return model.cartItems.length > 1 ;
        }


        messageService.subscribe('getActiveCartSuccess', function (response) {
            model.cart = response;
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


    };

    module.component("checkout", {
        templateUrl: "app/areas/authorizeduser/checkout/checkout.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "shoppingCartService", "loginService", "inventoryService", controller]

    });
}())