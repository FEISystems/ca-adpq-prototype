(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService, categoryService) {
        var model = this;
        model.listeners = [];

        this.$routerOnDeactivate = function (next, previous) {
            for (var i = 0; i < model.listeners.length; i++) {
                model.listeners[i]();
            };
            model.listeners = [];
            categoryService.setSorter(model.customSorter);
        };

        this.$routerOnActivate = function (next, previous) {
            model.provider = {};
            model.categoryId = next.urlPath.substring(next.urlPath.lastIndexOf("/") + 1);
            model.category = categoryService.getProductCategories(model.categoryId);
            model.customSorters = categoryService.getCustomSorters();
            model.customSorter = categoryService.getSorter();

            model.title = model.category.name;

            model.productTypes = [];
            model.categories = [];
            model.contracts = [];
            model.contractors = [];
            model.products = [];
            model.page = 0;
            model.pageCount = 1;
            model.itempPerPage = 20;
            model.filter = model.category.filter;


            model.sortChanged = function () {
                model.page = 0;
                model.fetchProducts();
            };

            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            };

            model.showHardwareMenu = function () {
                if (model.category.parentCategory === "Hardware") {
                    return true;
                } else {

                    return false;
                }
            };

            model.showServicesMenu = function () {
                if (model.category.parentCategory === "Services") {
                    return true;
                } else {

                    return false;
                }
            };

            model.isSoftware = function () {
                if (model.category.parentCategory === "Software") {
                    return true;
                } else {
                    return false;
                }
            };

            model.setPage = function (newPage) {
                if (!newPage || newPage < 0)
                    newPage = 0;
                if (newPage > model.pageCount - 1)
                    newPage = Math.max(0, model.pageCount - 1);
                if (model.page != newPage) {
                    model.page = newPage;
                    model.fetchProducts();
                }
            };

            model.fetchProducts = function () {
                 inventoryService.fetchProducts(model.page * model.itempPerPage, model.itempPerPage, model.customSorter.column, model.customSorter.ascending, model.filter);
            };
            
            model.fetchCount = function () {
                inventoryService.fetchCount(model.filter);
            };

            model.listeners.push(messageService.subscribe('querySuccess', function (response) {
                model.products = createRows(response, 4);
            }));

            model.listeners.push(messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            }));

            model.listeners.push(messageService.subscribe('countSuccess', function (response) {
                model.pageCount = Math.ceil(response / model.itempPerPage);
                model.page = 0;
                model.fetchProducts();
            }));

            model.listeners.push(messageService.subscribe('countFailure', function (response) {
                model.pageCount = 1;
                model.page = 0;
            }));

            model.fetchCount();
        }
    };

    module.component("categoryList", {
        templateUrl: "app/areas/public/categories/categoryList.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", "categoryService", controller]

    });
}())



