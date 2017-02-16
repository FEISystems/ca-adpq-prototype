(function() {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.data = {};
        model.showNavMenu = true;
        model.$onInit = function(){
        }
        

        $scope.menuItems = [
            
        ];

    }

    module.component("subNav", {
        templateUrl: "app/views/shared/components/sub-nav/sub-nav.component.html",
        controllerAs: "model",
        controller  : ["$scope", "$location", controller]
    });

}())