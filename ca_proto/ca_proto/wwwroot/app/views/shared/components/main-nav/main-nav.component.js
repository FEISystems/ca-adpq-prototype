(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, loginService, messageService, shoppingCartService, $rootScope, $sessionStorage) {
        var model = this;
        model.data = {};
        model.showNavMenu = true;
        model.cartItemCount = 0;
        model.isLoggedIn = false;
        model.userName = '';


        model.$onInit = function () {
            loginService.isLoggedIn();
        }

        messageService.subscribe('isLoggedInSuccess', function (response) {
            model.isLoggedIn = true;
            model.userName = response.userName || '';
        });

        messageService.subscribe('isLoggedInFailure', function (response) {
            model.isLoggedIn = false;
            model.userName = '';
        });

        model.logout = function () {
            model.isLoggedIn = false;
            model.userName = '';
            loginService.logout();
        }

        messageService.subscribe('loginSuccess', function (response) {
            model.isLoggedIn = true;
            model.userName = response.UserName;
            shoppingCartService.getActiveCart();
        });

        model.getActiveCart = function () {
            shoppingCartService.getActiveCart();
        };

        model.isAuthenticated = function () {
            return model.isLoggedIn;
        }

        messageService.subscribe('logoutSuccess', function (response) {
            model.isLoggedIn = false;
            model.userName = '';
            $location.path("public/home");
        });

        model.LogoutText = function () {

            return "Logout (" + model.userName + ")";
        }

        model.getActiveCart();


        messageService.subscribe('getActiveCartSuccess', function (response) {
            model.cart = response;
            model.cartItemCount = 0;
            if (model.cart.Items) {
                for (var i = 0; i < model.cart.Items.length; ++i) {
                    model.cartItemCount += model.cart.Items[i].Quantity;
                }
            }
        })


        messageService.subscribe('updateCartSuccess', function (response) {
            model.getActiveCart();
        })

        messageService.subscribe('addProductToCartSuccess', function (response) {
            model.getActiveCart();
        })

        messageService.subscribe('removeCartItemSuccess', function (response) {
            model.getActiveCart();
        })

        messageService.subscribe('placeOrderSuccess', function (response) {
            model.getActiveCart();
        })
        $rootScope.$on("userLoggedOut", function () {
            delete $sessionStorage.compareList;
            $location.path("public/home");
        });
    }
    
    module.component("mainNav", {
        templateUrl: "app/views/shared/components/main-nav/main-nav.component.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "loginService", "messageService", "shoppingCartService", "$rootScope", "$sessionStorage", controller]
    });

}())