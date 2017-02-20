(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Authorized User Profile";

    };

    module.component("authorizedUser", {
        templateUrl: "app/areas/admin/authorizeduser/authorizeduser.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())