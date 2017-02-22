(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Desktop Value Added Services";
        
        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 16;
        model.productType = { "Category" : "VAS Standard Desktop" };

        this.$routerOnActivate = function (next, previous) {
            
            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }

             model.fetchProducts = function () {
                inventoryService.fetchProducts(model.page * model.pageCount, model.pageCount, model.orderByColumn, model.orderAscending, model.productType);
            };
            
            model.fetchProducts();


            messageService.subscribe('querySuccess', function (response) {
                model.products = createRows(response, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };


    module.component("desktopValueAddedServices", {
        templateUrl: "app/areas/public/categories/services/valueaddedservices/desktopvalueaddedservices/desktopvalueaddedservices.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())