(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService, categoryService) {
        var model = this;
       

        this.$routerOnActivate = function (next, previous) {
            model.provider = {};
            model.categoryId = next.urlPath.substring(next.urlPath.lastIndexOf("/") + 1);
            model.category = categoryService.getProductCategories(model.categoryId);
            model.title = model.category.name;

            model.productTypes = [];
            model.categories = [];
            model.contracts = [];
            model.contractors = [];
            model.products = [];
            model.orderByColumn = "name";
            model.orderAscending = true;
            model.page = 0;
            model.pageCount = 500;
            model.filter = model.category.filter;

            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }

            model.showHardwareMenu = function() {
                if (model.category.parentCategory === "Hardware") {                    
                    return true;
                } else {
                                        
                    return false;
                }
            }

            model.showServicesMenu = function() {
                if (model.category.parentCategory === "Services") {                    
                    return true;
                } else {
                                        
                    return false;
                }
            }

            model.isSoftware = function() {
                if (model.category.parentCategory === "Software") {                    
                    return true;
                } else {                                        
                    return false;
                }
            }

             model.fetchProducts = function () {
                inventoryService.fetchProducts(model.page * model.pageCount, model.pageCount, model.orderByColumn, model.orderAscending, model.filter);
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

    module.component("categoryList", {
        templateUrl: "app/areas/public/categories/categoryList.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", "categoryService", controller]

    });
}())



