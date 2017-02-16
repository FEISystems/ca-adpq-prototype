(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Home";

    };

    module.component("home", {
        templateUrl: "app/areas/public/home/home.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())