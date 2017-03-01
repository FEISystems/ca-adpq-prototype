(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $route, messageService, inventoryService, $timeout) {
        var model = this;
        model.provider = {};
        model.title = "Product Details";
        model.product = {};


        this.$routerOnActivate = function (next, previous) {
            model.productId = parseInt(next.params.id);

            model.getProduct = function () {
                inventoryService.getProductDetails(model.productId);
            };

            model.getProduct();


            messageService.subscribe('getProductDetailsSuccess', function (response) {
                model.product = response;

            })

            messageService.subscribe('getProductDetailsFailure', function (response) {
                model.product = {};
            })

        }

    };

    module.component("productDetails", {
        templateUrl: "app/areas/public/productdetails/productdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$route", "messageService", "inventoryService", "$timeout", controller]

    });
}())