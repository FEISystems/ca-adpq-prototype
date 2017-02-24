(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All Accessories";

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
                
                var filteredList = response.filter(function(items) { return items.Category === "Standard Desktop Options Upgrades"  ||  
                    items.Category === "Power Desktop Options Upgrades" || 
                    items.Category === "Workstation Options Upgrades" ||
                    items.Category === "Thin Client Options Upgrades" || 
                    items.Category === "All In One Options Upgrades" ||  
                    items.Category === "Micro Desktop Options" ||  
                    items.Category === "Micro Standard Desktop Upgrades" ||  
                    items.Category === "All In One Options Upgrades" ||  
                    items.Category === "Options/Upgrades Mobile Workstation" ||  
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
                    items.Category === "600 Desktop Upgrades" ||  
                    items.Category === "800 Mini  Upgrades" ||  
                    items.Category === "AiO 800 Options Upgrades" ||  
                    items.Category === "AiO Upgrade" ||  
                    items.Category === "AOI Options Upgrades" ||  
                    items.Category === "Options Upgrades" ||  
                    items.Category === "Options/Upgrade Standard, Power Laptops 640" ||  
                    items.Category === "Options/Upgrade Standard, Power Laptops 650" ||  
                    items.Category === "Options/Upgrade Standard, Power, Mobile Laptops" ||
                    items.Category === "Options/Upgrades Standard, Power and Ultralight Laptop" ||
                    items.Category === "POWER DESKTOP 800 Upgrade" ||
                    items.Category === "Z640 Options Upgrades" ||
                    items.Category === "Options/Upgrades Standard, Power"
                });
                model.products = createRows(filteredList, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };

    module.component("allAccessories", {
        templateUrl: "app/areas/public/categories/hardware/accessories/allaccessories/allaccessories.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())