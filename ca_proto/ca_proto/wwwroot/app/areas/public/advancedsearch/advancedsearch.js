(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Advanced Search";
        model.products = [];
        model.manufacturers = [];

        model.productName = "";
        model.category = "";
        model.priceRange = "";
        model.manufacturer = "";
        model.manfacturerPartNumber = "";
        model.sku = "";

        $scope.doAdvancedSearch = function () {

            switch (model.priceRange) {
                case "$100 and Under":
                    model.minPrice = 0;
                    model.maxPrice = 100;
                    break;
                case "$500 and Under":
                    model.minPrice = 0;
                    model.maxPrice = 500;
                    break;
                case "$1000 and Under":
                    model.minPrice = 0;
                    model.maxPrice = 1000;
                    break;
                case "$1500 and Under":
                    model.minPrice = 0;
                    model.maxPrice = 1500;
                    break;
                case "$2000 and Under":
                    model.minPrice = 0;
                    model.maxPrice = 2000;
                    break;
                case "$2500 and Under":
                    model.minPrice = 0;
                    model.maxPrice = 2500;
                    break;
                default:
                    model.minPrice = 0;
                    model.maxPrice = 99999999;
            }

            inventoryService.advancedSearch(model.productName, model.category, model.minPrice, model.maxPrice, model.manufacturer, model.manfacturerPartNumber, model.sku);
        }


        messageService.subscribe('advancedsearchSuccess', function (response) {
            model.products = [];
            model.products = response;

        })

        messageService.subscribe('advancedsearchFailure', function (response) {
            model.products = [];
        })

        messageService.subscribe('retrievedManufacturer', function (response) {
            alert(JSON.stringify(response));
            model.manufacturers = [];
            model.manufacturers = response;
        })

        messageService.subscribe('retrievedManufacturerFail', function (response) {
            alert(JSON.stringify(response));
            model.manufacturers = [];
        })

        $scope.clear = function () {
            model.productName = "";
            model.category = "";
            model.contractPrice = "";
            model.manufacturer = "";
            model.manfacturerPartNumber = "";
            model.sku = "";
            model.products = [];
            model.priceRange = "";
        }

        inventoryService.fetchManufacturers();
    };

    module.component("advancedSearch", {
        templateUrl: "app/areas/public/advancedsearch/advancedsearch.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())