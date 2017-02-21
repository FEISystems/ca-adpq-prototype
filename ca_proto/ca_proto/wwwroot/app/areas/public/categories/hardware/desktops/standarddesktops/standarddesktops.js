(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Standard Desktops";

    };

    module.component("standardDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/standarddesktops/standarddesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())