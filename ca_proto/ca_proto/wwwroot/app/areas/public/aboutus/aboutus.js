(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "About Us";

    };

    module.component("aboutUs", {
        templateUrl: "app/areas/public/aboutus/aboutus.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())