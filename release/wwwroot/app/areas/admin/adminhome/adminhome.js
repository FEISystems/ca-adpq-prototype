(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Admin Home";

    };

    module.component("adminHome", {
        templateUrl: "app/areas/admin/adminhome/adminhome.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())