(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "All Reports";

    };

    module.component("reports", {
        templateUrl: "app/areas/admin/reports/reports.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())