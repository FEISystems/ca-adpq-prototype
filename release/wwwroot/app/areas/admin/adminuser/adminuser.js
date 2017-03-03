(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Admin User Profile";

    };

    module.component("adminUser", {
        templateUrl: "app/areas/admin/adminuser/adminuser.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())