(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Hardware";


        $scope.isActive = function (path) {
            return ($location.path() === path) ? 'usa-current' : '';
        }

    };

    module.component("hardwareMenu", {
            templateUrl: "app/areas/public/categories/shared/hardwaremenu/hardwaremenu.html",
            controller: ["$scope", "$location", controller]
    });
}())