(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Order Details";

    };

    module.component("orderDetails", {
        templateUrl: "app/areas/authorizeduser/orderdetails/orderdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())