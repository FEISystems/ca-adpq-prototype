(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Order History";

    };

    module.component("orderHistory", {
        templateUrl: "app/areas/registereduser/orderhistory/orderhistory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())