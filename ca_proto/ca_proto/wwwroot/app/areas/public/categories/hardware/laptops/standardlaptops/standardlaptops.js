(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Standard Laptops";

    };

    module.component("standardLaptops", {
        templateUrl: "app/areas/public/categories/hardware/laptops/standardlaptops/standardlaptops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())