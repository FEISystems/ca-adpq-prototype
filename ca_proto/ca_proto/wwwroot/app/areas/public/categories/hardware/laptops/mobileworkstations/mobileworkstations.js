(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Mobile Workstations";

    };

    module.component("mobileWorkstations", {
        templateUrl: "app/areas/public/categories/hardware/laptops/mobileworkstations/mobileworkstations.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())