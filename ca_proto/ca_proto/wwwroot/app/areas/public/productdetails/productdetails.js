(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $route, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Product Details";


        //console.log($route);

        this.$routerOnActivate = function (next, previous) {
            model.productId = parseInt(next.params.id);

            model.getProduct = function () {
                inventoryService.getProduct(model.productId);
            };

            model.getProduct();


            messageService.subscribe('getProductSuccess', function (response) {
                model.product = response;

            })

            messageService.subscribe('getProductFailure', function (response) {
                model.product = {};
            })


        }

    };

    module.component("productDetails", {
        templateUrl: "app/areas/public/productdetails/productdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$route", "messageService", "inventoryService", controller]

    });
}())