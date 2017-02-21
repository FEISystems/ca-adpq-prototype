(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Vendor Profile";

    };

    module.component("vendor", {
        templateUrl: "app/areas/admin/vendor/vendor.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())