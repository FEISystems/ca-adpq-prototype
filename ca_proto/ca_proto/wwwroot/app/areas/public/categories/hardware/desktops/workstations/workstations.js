(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Workstations";

    };

    module.component("workstations", {
        templateUrl: "app/areas/public/categories/hardware/desktops/workstations/workstations.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())