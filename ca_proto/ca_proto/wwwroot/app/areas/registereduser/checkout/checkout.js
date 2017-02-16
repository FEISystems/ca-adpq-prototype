(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Checkout";

    };

    module.component("checkout", {
        templateUrl: "app/areas/registereduser/checkout/checkout.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())