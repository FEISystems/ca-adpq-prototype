(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, sampleInventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All Desktops";

        
        
        sampleInventoryService.getInventory().get().$promise.then(
            function( data ) {
                model.products = data;
            },
            function( error ) {
                alert( "Something went wrong!" );

            }
        );

    };

    module.component("allDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/alldesktops/alldesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "sampleInventoryService", controller]

    });
}())