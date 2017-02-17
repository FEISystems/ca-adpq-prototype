(function() {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, loginService) {
        var model = this;
        model.data = {};
        model.showNavMenu = true;
        model.$onInit = function(){
        }
        
        model.logout = function () {
            loginService.logout();
        }

        $scope.menuItems = [
            
        ];

    }

    module.component("mainNav", {
        templateUrl: "app/views/shared/components/main-nav/main-nav.component.html",
        controllerAs: "model",
        controller  : ["$scope", "$location", "loginService", controller]
    });

}())