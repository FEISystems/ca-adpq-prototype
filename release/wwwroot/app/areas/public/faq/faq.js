(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "FAQ";

    };

    module.component("faq", {
        templateUrl: "app/areas/public/faq/faq.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())