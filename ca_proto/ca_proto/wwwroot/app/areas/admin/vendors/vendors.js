(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Vendors";

    };

    module.component("vendors", {
        templateUrl: "app/areas/admin/vendors/vendors.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())