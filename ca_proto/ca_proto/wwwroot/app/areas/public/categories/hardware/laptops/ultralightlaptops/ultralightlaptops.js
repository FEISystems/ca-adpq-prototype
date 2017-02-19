(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Ultralight Laptops";

    };

    module.component("ultralightLaptops", {
        templateUrl: "app/areas/public/categories/hardware/laptops/ultralightlaptops/ultralightlaptops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())