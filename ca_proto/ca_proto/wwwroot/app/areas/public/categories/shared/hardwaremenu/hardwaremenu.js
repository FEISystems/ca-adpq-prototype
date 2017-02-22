(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Hardware";

    };

    module.directive("hardwareMenu", function() {
        return {            
            templateUrl: "app/areas/public/categories/shared/hardwaremenu/hardwaremenu.html"
        }

    });
}())