(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $rootScope, messageService, inventoryService, $sessionStorage) {
        var model = this;
        model.provider = {};
        model.title = "Compare List";
        model.products = [];

        if ($sessionStorage.compareList) {
            model.compareListIds = $sessionStorage.compareList;
        } else 
        {
            model.compareListIds = [];
        }

        
        model.getProduct = function (productId) {
            inventoryService.getProduct(productId);
        };
        
        var updateCompareList = function(){
            model.products = [];
            if (model.compareListIds.length > 0) {
                for (let productId of model.compareListIds){
                    model.getProduct(productId);
                }
            }
        }

        updateCompareList();
        
            console.log($scope.compareProductId);

        $scope.removeFromCompare = function(productId) {
            $sessionStorage.compareList = jQuery.grep($sessionStorage.compareList, function(value) {
                                            return value != productId;
                                        });;
            model.compareListIds = $sessionStorage.compareList; 
            updateCompareList();
        };

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
        controller: ["$scope", "$location", "$rootScope", "messageService", "inventoryService", "$sessionStorage", controller]

    });
}())