(function () {
    'use strict';
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.editing = false;
        model.product = {};
        model.provider = {};
        model.title = "Admin Product Management";

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 20;

        model.clone = function (item) {
            return JSON.parse(JSON.stringify(item));
        };

        model.addProduct = function () {
            //preserve the model.product in case the add operation fails
            var uploadData = model.clone(model.product);
            //only store ids for lookups
            uploadData.CategoryId = uploadData.CategoryId.Id;
            uploadData.ProductType = uploadData.ProductType.Id;
            uploadData.ContractId = uploadData.ContractId.Id;
            if (uploadData.Id)
                inventoryService.editProduct(uploadData);
            else
                inventoryService.addProduct(uploadData);
        };

        model.importFile = function () {
            try
            {

                var fileinfo = document.getElementById("selectedfile").files[0];
                //model.debugAlert(fileinfo);
                if (fileinfo == undefined)
                {
                    alert("Please select a file.");
                    return;
                }
                inventoryService.importFile(fileinfo);
            }
            catch (error)
            {
                alert (error);
            }
        };

        model.edit = function (id) {
            for (var i = 0; i < model.products.length; i++) {
                var item = model.products[i];
                if (item.Id == id) {
                    model.product = model.buildProduct(item);
                    model.editing = true;
                    return;
                }
            }
        };

        model.delete = function (id) {
            if (confirm("This will delete the selected item!"))
                inventoryService.deleteProduct(id);
        };

        model.fetchProducts = function () {
            inventoryService.fetchProducts(model.page * model.pageCount, model.pageCount, model.orderByColumn, model.orderAscending);
        };

        model.newProduct = function () {
            model.product = {};
            model.editing = false;
            model.fetchProducts();
        };

        model.buildProduct = function (item) {
            var result = model.clone(item);
            //associate lookup items based on ids
            result.ContractId = model.FindLookup(model.contracts, item.ContractId);
            result.ProductType = model.FindLookup(model.productTypes, item.ProductType);
            result.CategoryId = model.FindLookup(model.categories, item.CategoryId);
            return result;
        };

        model.debugAlert = function (data) {
            alert(JSON.stringify(data));
        }

        model.FindLookup = function (list, id) {
            for (var i=0; i<list.length; i++)
            {
                if (list[i].Id == id)
                    return list[i];
            }
            return {};
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
            model.newProduct();
        })

        messageService.subscribe('addProductFailure', function (response) {
            alert('Add Product Failure');
        })

        messageService.subscribe('updateProductSuccess', function (response) {
            alert('Update Product Success');
            model.newProduct();
        })

        messageService.subscribe('updateProductFailure', function (response) {
            alert('Update Product Failure');
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

        messageService.subscribe('querySuccess', function (response) {
            model.products = response;
        })

        messageService.subscribe('queryFailure', function (response) {
            model.products = [];
        })

        messageService.subscribe('deleteSuccess', function (response) {
            alert('Delete Product Success');
            model.newProduct();
        })

        messageService.subscribe('deleteFailure', function (response) {
            alert('Delete Product Failure');
        })

        inventoryService.fetchProductTypes();
        inventoryService.fetchCategories();
        inventoryService.fetchContracts();
        model.fetchProducts();
    };

    module.component("inventory", {
        templateUrl: "app/areas/admin/inventory/inventory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });

})();
