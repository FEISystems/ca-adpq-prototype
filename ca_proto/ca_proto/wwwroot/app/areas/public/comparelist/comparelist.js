(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Compare List";

    };

    module.component("compareList", {
        templateUrl: "app/areas/public/comparelist/comparelist.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())