(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $rootScope, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Compare List";
        model.products = [];

        if ($rootScope.compareList) {
            model.compareListIds = $rootScope.compareList;
        } else 
        {
            model.compareListIds = [];
        }

        
        model.getProduct = function (productId) {
            inventoryService.getProduct(productId);
        };
        
        if (model.compareListIds.length > 0) {
            for (let productId of model.compareListIds){
                model.getProduct(productId);
            }
        }

        messageService.subscribe('getProductSuccess', function (response) {
            model.products.push(response);

        })

        messageService.subscribe('getProductFailure', function (response) {
            model.products = [];
        })

    };

    module.component("compareList", {
        templateUrl: "app/areas/public/comparelist/comparelist.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$rootScope", "messageService", "inventoryService", controller]

    });
}())