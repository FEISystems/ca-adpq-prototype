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
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.itemsPerPage = 10;
        model.pageCount = 1;
        model.filter = {};

        model.clone = function (item) {
            return JSON.parse(JSON.stringify(item));
        };

        model.addProduct = function () {
            //preserve the model.product in case the add operation fails
            var uploadData = model.clone(model.product);
            //model.debugAlert(uploadData);
            //alert(uploadData.Id);
            ////only store ids for lookups
            //uploadData.CategoryId = uploadData.CategoryId.Id;
            //uploadData.ProductType = uploadData.ProductType.Id;
            //uploadData.ContractId = uploadData.ContractId.Id;
            if (uploadData.Id) {
                //alert("editing");
                inventoryService.editProduct(uploadData);
            }
            else {
                //alert("adding");
                inventoryService.addProduct(uploadData);
            }
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
            var filter = model.filter;
            //model.debugAlert(filter);
            inventoryService.fetchProducts(model.page * model.itemsPerPage, model.itemsPerPage, model.orderByColumn, model.orderAscending, filter);
        };

        model.newProduct = function () {
            model.product = {};
            model.editing = false;
            model.fetchProducts();
        };

        model.buildProduct = function (item) {
            var result = model.clone(item);
            //model.debugAlert(result);
            //associate lookup items based on ids
            //result.ContractId = model.FindLookup(model.contracts, item.ContractId);
            //result.ProductType = model.FindLookup(model.productTypes, item.ProductType);
            //result.CategoryId = model.FindLookup(model.categories, item.CategoryId);
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

        model.fetchAll = function () {
            inventoryService.fetchProductTypes();
            inventoryService.fetchCategories();
            inventoryService.fetchContracts();
            model.fetchProducts();
            model.fetchPageCount();
        };

        model.buildFilter = function () {
            var result = {};
            //todo: need to include the filter data here
            return result;
        }

        model.fetchPageCount = function () {
            var filter = model.filter;
            inventoryService.fetchCount(filter);
        };

        model.setPage = function(newPage)
        {
            if (!newPage || newPage < 0)
                newPage = 0;
            if (newPage > model.pageCount - 1)
                newPage = model.pageCount - 1;
            model.page = newPage;
            model.fetchProducts();
        }

        model.firstPage = function () {
            model.setPage(0);
        };

        model.priorPage = function () {
            model.setPage(model.page - 1);
        };

        model.nextPage = function () {
            model.setPage(model.page + 1);
        };

        model.lastPage = function () {
            model.setPage(model.pageCount);
        };

        messageService.subscribe('countSuccess', function (response) {
            model.pageCount = Math.ceil(response / model.itemsPerPage);
        })

        messageService.subscribe('countFailure', function (response) {
            model.pageCount = 1;
        })

        messageService.subscribe('importSuccess', function (response) {
            alert('Import Success\r\n' + response);
            document.getElementById("fileImportForm").reset();
            model.fetchAll();
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

        messageService.subscribe('retrievedContractors', function (response) {
            model.contractors = response;
        })

        messageService.subscribe('retrievedContractorsFail', function (response) {
            model.contractors = [];
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

        model.fetchAll();
    };

    module.component("inventory", {
        templateUrl: "app/areas/admin/inventory/inventory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });

})();
