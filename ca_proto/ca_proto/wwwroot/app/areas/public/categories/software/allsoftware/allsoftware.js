(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Software";

    };

    module.component("allSoftware", {
        templateUrl: "app/areas/public/categories/software/allsoftware/allsoftware.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())