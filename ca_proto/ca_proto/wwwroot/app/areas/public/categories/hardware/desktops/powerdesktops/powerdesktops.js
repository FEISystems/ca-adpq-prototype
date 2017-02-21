(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Power Desktops";

    };

    module.component("powerDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/powerdesktops/powerdesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())