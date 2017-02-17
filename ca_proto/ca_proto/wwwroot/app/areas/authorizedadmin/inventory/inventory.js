(function () {
    'use strict';
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.product = {};
        model.provider = {};
        model.title = "Admin Product Management";

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];

        model.addProduct = function () {
            alert(JSON.stringify(model.product));
            return;
            inventoryService.addProduct(model.product);
        };

        model.importFile = function () {
            var fileinfo = document.getElementById("selectedfile").files[0];
            if (fileinfo == undefined)
            {
                alert("Please select a file.");
                return;
            }
            inventoryService.importFile(fileinfo);
        };

        messageService.subscribe('importSuccess', function (response) {
            alert('Import Success');
            document.getElementById("fileImportForm").reset();
        })

        messageService.subscribe('importFailure', function (response) {
            alert('Import Failure: ' + response);
        })

        messageService.subscribe('addProductSuccess', function (response) {
            alert('Add Product Success');
            model.product = {};
        })

        messageService.subscribe('addProductFailure', function (response) {
            alert('Add Product Failure');
        })

        messageService.subscribe('retrievedProductTypes', function (response) {
            model.productTypes = response;
        })

        messageService.subscribe('retrievedProductTypesFail', function (response) {
            model.productTypes = [];
        })

        messageService.subscribe('retrievedCategories', function (response) {
            model.categories = response;
        })

        messageService.subscribe('retrievedCategoriesFail', function (response) {
            model.categories = [];
        })

        messageService.subscribe('retrievedContracts', function (response) {
            model.contracts = response;
        })

        messageService.subscribe('retrievedContractsFail', function (response) {
            model.contracts = [];
        })

        inventoryService.fetchProductTypes();
        inventoryService.fetchCategories();
        inventoryService.fetchContracts();
    };

    module.component("adminInventory", {
        templateUrl: "app/areas/authorizedadmin/inventory/inventory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });

})();
