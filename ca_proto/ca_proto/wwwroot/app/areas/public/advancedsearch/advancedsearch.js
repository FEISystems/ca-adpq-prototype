(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Advanced Search";

    };

    module.component("advancedSearch", {
        templateUrl: "app/areas/public/advancedsearch/advancedsearch.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())