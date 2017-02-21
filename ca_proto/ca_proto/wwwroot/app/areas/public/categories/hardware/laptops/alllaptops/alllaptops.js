(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All Laptops";

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 500;

        this.$routerOnActivate = function (next, previous) {
            
            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }

             model.fetchProducts = function () {
                inventoryService.fetchProducts(model.page * model.pageCount, model.pageCount, model.orderByColumn, model.orderAscending);
            };
            
            model.fetchProducts();


            messageService.subscribe('querySuccess', function (response) {
                
                var filteredList = response.filter(function(items) { return items.Category === "Standard Laptop Config" ||  items.Category === "Power Laptop Config" ||  items.Category === "Ultralight Laptop Config" });
                console.log(filteredList);
                model.products = createRows(filteredList, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };

    module.component("allLaptops", {
        templateUrl: "app/areas/public/categories/hardware/laptops/alllaptops/alllaptops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())