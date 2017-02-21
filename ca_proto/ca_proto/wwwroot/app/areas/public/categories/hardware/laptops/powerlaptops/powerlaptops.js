(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Power Laptops";

    };

    module.component("powerLaptops", {
        templateUrl: "app/areas/public/categories/hardware/laptops/powerlaptops/powerlaptops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())