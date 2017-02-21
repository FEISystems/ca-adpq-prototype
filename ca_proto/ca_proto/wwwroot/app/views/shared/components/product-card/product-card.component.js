(function() {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.data = {};
        model.$onInit = function(){
        }
        

        $scope.menuItems = [
            
        ];

    }

    module.component("productCard", {
        templateUrl: "app/views/shared/components/product-card/product-card.component.html",
        controllerAs: "model",
        controller  : ["$scope", "$location", controller]
    });

}())