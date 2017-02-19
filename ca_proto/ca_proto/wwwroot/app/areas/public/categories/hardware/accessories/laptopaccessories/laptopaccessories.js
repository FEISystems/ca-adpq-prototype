(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Laptop Accessories";

    };

    module.component("laptopAccessories", {
        templateUrl: "app/areas/public/categories/hardware/accessories/laptopaccessories/laptopaccessories.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())