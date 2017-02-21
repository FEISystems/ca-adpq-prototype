(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Footer";

    };

    module.component("footer", {
        templateUrl: "app/views/shared/components/footer/footer.component.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())