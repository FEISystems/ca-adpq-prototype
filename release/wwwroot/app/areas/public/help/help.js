(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Help";

    };

    module.component("help", {
        templateUrl: "app/areas/public/help/help.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())