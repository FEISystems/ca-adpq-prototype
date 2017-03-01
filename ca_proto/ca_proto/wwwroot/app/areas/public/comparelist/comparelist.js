(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $rootScope, messageService, compareService, $sessionStorage, $timeout) {
        var model = this;
        model.provider = {};
        model.title = "Compare List";
        model.products = [];

        
        compareService.refreshCompareList();


        $rootScope.$on("clearCompareItems", function(){
            model.products = [];
            $timeout(function(){
                $scope.$apply();
            });
        });

        
        model.removeFromCompare = function (productId) {
           compareService.removeCompareItem(productId);
        };

        
        messageService.subscribe('getCompareProductSuccess', function (response) {
            model.products.push(response);
        })

    };

    module.component("compareList", {
        templateUrl: "app/areas/public/comparelist/comparelist.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$rootScope", "messageService", "compareService", "$sessionStorage", "$timeout", controller]

    });
}())