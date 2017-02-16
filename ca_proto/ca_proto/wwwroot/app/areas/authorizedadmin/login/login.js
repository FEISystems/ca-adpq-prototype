(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Admin Login";

    };

    module.component("adminLogin", {
        templateUrl: "app/areas/authorizedadmin/login/login.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())