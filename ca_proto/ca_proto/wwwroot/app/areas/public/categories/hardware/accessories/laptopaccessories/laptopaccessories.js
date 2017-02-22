(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Laptop Accessories";

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 500;
        model.productType = {"ProductType":"Hardware"};

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
                
                var filteredList = response.filter(function(items) { return  items.Category === "Options/Upgrades Mobile Workstation" ||  
                    items.Category === "Options/Upgrade Mobile Workstation Laptop 15" ||  
                    items.Category === "Options/Upgrade Mobile Workstation Laptop 17" ||  
                    items.Category === "Options/Upgrade Mobile Workstation Studio" ||  
                    items.Category === "Options/Upgrades All Laptops" ||  
                    items.Category === "Options/Upgrades Standard and Ultralight Laptop" ||  
                    items.Category === "Options/Upgrades Power Laptop" ||  
                    items.Category === "Options/Upgrades Standard Laptop" ||  
                    items.Category === "Options/Upgrade Standard, Power Laptops" ||  
                    items.Category === "Options/Upgrades Ultralight Laptop" ||    
                    items.Category === "Options/Upgrade Ultralight Laptop" ||  
                    items.Category === "Options/Upgrade Ultralight Laptop 820" ||  
                    items.Category === "Options/Upgrade Ultralight Laptop" ||  
                    items.Category === "Options/Upgrade Ultralight Laptop" || 
                    items.Category === "Options/Upgrade Standard, Power Laptops 640" ||  
                    items.Category === "Options/Upgrade Standard, Power Laptops 650" ||  
                    items.Category === "Options/Upgrade Standard, Power, Mobile Laptops" ||
                    items.Category === "Options/Upgrades Standard, Power and Ultralight Laptop"
                });
                model.products = createRows(filteredList, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };


    module.component("laptopAccessories", {
        templateUrl: "app/areas/public/categories/hardware/accessories/laptopaccessories/laptopaccessories.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())