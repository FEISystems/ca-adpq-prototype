(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Cancel Order";

    };

    module.component("cancelOrder", {
        templateUrl: "app/areas/authorizeduser/cancelledorderconfirmation/cancelledorderconfirmation.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())