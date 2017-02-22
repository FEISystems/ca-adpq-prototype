(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All Value Added Services";
        
        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 500;
        model.productType = {"ProductType":"Service"};

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
                
                var filteredList = response.filter(function(items) { return items.Category === "VAS Standard Desktop" ||  
                items.Category === "Value Added Services All Laptops" ||  items.Category === "VAS Installation" ||
                items.Category === "VAS Asset Tagging - Bidder administration of State provided tag (with number)"  ||  
                items.Category === "VAS Imaging" || items.Category === "VAS Take-Back Services" || 
                items.Category === "VAS Emergency Services (4 hour response, per occurrence)"   || 
                items.Category === "VAS Asset informatin via internet"   || 
                items.Category === "VAS Self Warranty Certification"   || 
                items.Category === "VAS Non-Core Deployment and Logistics"   || 
                items.Category === "Value added services "   });
                model.products = createRows(filteredList, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };


    module.component("allValueAddedServices", {
        templateUrl: "app/areas/public/categories/services/valueaddedservices/allvalueaddedservices/allvalueaddedservices.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())