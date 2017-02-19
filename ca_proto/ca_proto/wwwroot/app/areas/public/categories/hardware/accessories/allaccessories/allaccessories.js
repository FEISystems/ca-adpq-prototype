(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Accessories";

    };

    module.component("allAccessories", {
        templateUrl: "app/areas/public/categories/hardware/accessories/allaccessories/allaccessories.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())