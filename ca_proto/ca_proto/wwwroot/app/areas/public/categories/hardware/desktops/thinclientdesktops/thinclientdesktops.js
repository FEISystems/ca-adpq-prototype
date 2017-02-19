(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Thin Client Desktops";

    };

    module.component("thinClientDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/thinclientdesktops/thinclientdesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())