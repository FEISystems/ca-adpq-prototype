(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All in One Desktops";

    };

    module.component("allInOneDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/allinonedesktops/allinonedesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())