(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Account Information";

    };

    module.component("accountInformation", {
        templateUrl: "app/areas/registereduser/accountinformation/accountinformation.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())