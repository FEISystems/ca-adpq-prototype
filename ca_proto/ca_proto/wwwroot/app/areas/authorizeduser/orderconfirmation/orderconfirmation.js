(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Order Confirmation";

    };

    module.component("orderConfirmation", {
        templateUrl: "app/areas/authorizeduser/orderconfirmation/orderconfirmation.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())