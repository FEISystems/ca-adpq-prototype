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

        model.addProduct = function () {
            //preserve the model.product in case the add operation fails
            var uploadData = JSON.parse(JSON.stringify(model.product));
            uploadData.CategoryId = uploadData.CategoryId.id;
            uploadData.ProductType = uploadData.ProductType.id;
            uploadData.ContractId = uploadData.ContractId.id;
            if (uploadData.validAsAddOnForParentCategories) {
                for (var i = 0; i < uploadData.ValidAsAddOnForParentCategories.length; i++) {
                    uploadData.ValidAsAddOnForParentCategories[i] = uploadData.ValidAsAddOnForParentCategories[i].id;
                }
            }
            if (uploadData.Id)
                inventoryService.editProduct(uploadData);
            else
                inventoryService.addProduct(uploadData);
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

        model.edit = function (id) {
            for (var i = 0; i < model.products.length; i++) {
                var item = model.products[i];
                if (item.id == id) {
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
            var result = {};
            result.Id = item.id;
            result.Name = item.name;
            result.ListPrice = item.listPrice;
            result.ContractPrice = item.contractPrice;
            result.ContractId = model.FindLookup(model.contracts, item.contractId);
            result.Manufacturer = item.manufacturer;
            result.ManufacturerPartNumber = item.manufacturerPartNumber;
            result.SKU = item.sku;
            result.ProductType = model.FindLookup(model.productTypes, item.productType);
            result.CategoryId = model.FindLookup(model.categories, item.categoryId);
            if (item.validAsAddOnForParentCategories && item.validAsAddOnForParentCategories.length)
            {
                result.ValidAsAddOnForParentCategories = JSON.parse(JSON.stringify(item.validAsAddOnForParentCategories));
                for (var i = 0; i < result.ValidAsAddOnForParentCategories.length; i++)
                {
                    result.ValidAsAddOnForParentCategories[i] = model.FindLookup(model.categories, result.ValidAsAddOnForParentCategories[i]);
                }
            }
            else
            {
                result.ValidAsAddOnForParentCategories = [];
            }
            return result;
        };

        model.FindLookup = function (list, id) {
            for (var i=0; i<list.length; i++)
            {
                if (list[i].id == id)
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
