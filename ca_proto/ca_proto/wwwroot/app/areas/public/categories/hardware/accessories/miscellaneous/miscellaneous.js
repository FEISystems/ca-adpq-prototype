(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Miscellaneous Accessories";

    };

    module.component("miscellaneous", {
        templateUrl: "app/areas/public/categories/hardware/accessories/miscellaneous/miscellaneous.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())