(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Desktop Accessories";

    };

    module.component("desktopAccessories", {
        templateUrl: "app/areas/public/categories/hardware/accessories/desktopaccessories/desktopaccessories.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())