(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Cart";

    };

    module.component("cart", {
        templateUrl: "app/areas/authorizeduser/cart/cart.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())