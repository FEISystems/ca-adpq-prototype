(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Review Order";

    };

    module.component("reviewOrder", {
        templateUrl: "app/areas/registereduser/revieworder/revieworder.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())