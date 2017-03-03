(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Authorized Users";

    };

    module.component("authorizedUsers", {
        templateUrl: "app/areas/admin/authorizedusers/authorizedusers.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())