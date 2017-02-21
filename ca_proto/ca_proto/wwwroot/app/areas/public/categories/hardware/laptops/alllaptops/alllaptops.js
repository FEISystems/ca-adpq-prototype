(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Laptops";

    };

    module.component("allLaptops", {
        templateUrl: "app/areas/public/categories/hardware/laptops/alllaptops/alllaptops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())