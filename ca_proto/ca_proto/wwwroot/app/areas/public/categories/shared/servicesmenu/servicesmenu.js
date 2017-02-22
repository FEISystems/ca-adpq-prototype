(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Services";


        $scope.isActive = function (path) {
            console.log($location);
            return ($location.path() === path) ? 'usa-current' : '';
        }



    };

    module.component("servicesMenu", {
            templateUrl: "app/areas/public/categories/shared/servicesmenu/servicesmenu.html",
            controller: ["$scope", "$location", controller]
    });
}())