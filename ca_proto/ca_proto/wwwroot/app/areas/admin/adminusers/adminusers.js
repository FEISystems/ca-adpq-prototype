(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Admin Users";

    };

    module.component("adminUsers", {
        templateUrl: "app/areas/admin/adminusers/adminusers.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())