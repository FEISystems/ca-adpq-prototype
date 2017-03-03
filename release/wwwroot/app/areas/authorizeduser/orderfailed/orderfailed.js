(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Order Failed";

        $scope.continueShopping = function() {
            $location.path("home");
        }

    };

    module.component("orderFailed", {
        templateUrl: "app/areas/authorizeduser/orderfailed/orderfailed.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())