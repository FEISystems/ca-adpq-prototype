(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Desktops";

    };

    module.component("allDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/alldesktops/alldesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())