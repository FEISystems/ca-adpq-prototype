(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Monitors & Monitor Accessories";

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 500;
        model.productType = {};

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
                
                var filteredList = response.filter(function(items) { return  items.Category === "19 inch Standard MONITOR" ||  
                    items.Category === "19 inch WideScreen MONITOR" ||  
                    items.Category === "22 inch Touchscreen MONITOR" ||  
                    items.Category === "22 inch Widescreen MONITOR" ||  
                    items.Category === "24 inch Widescreen MONITOR" ||  
                    items.Category === "28 inch Widescreen MONITOR" ||  
                    items.Category === "30 inch Widescreen MONITOR" ||  
                    items.Category === "Monitor Option/Upgrades" ||  
                    items.Category === "Monitor Options Upgrades" ||  
                    items.Category === "Monitor Service O/U" ||    
                    items.Category === "Options Upgrades 19 Inch Widescreen Monitor O/U" ||  
                    items.Category === "Options Upgrades 21 Inch Touchscreen Monitor" ||  
                    items.Category === "Options Upgrades 22 Inch Widescreen" ||  
                    items.Category === "Options Upgrades 24 Inch Widescreen Monitor" || 
                    items.Category === "Service Options Upgrades for 30 inch monitors" ||  
                    items.Category === "Service Options Upgrades Monitors"
                });
                model.products = createRows(filteredList, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };


    module.component("monitors", {
        templateUrl: "app/areas/public/categories/hardware/accessories/monitors/monitors.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())