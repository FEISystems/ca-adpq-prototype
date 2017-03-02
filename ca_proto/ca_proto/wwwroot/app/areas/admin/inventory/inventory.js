(function () {
    'use strict';
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService, growl) {
        var model = this;
        model.editing = false;
        model.product = {};
        model.provider = {};
        model.title = "Admin Product Management";

        model.unitsOfMeasure = [];
        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.itemsPerPage = 10;
        model.pageCounts = [5, 10, 25, 50];
        model.pageCount = 1;
        model.filter = {};
        model.activeFilter = {};
        model.tab = 3;
        model.importProgress = "";
        model.imageFileNames = [];
        $scope.submitted = false;

        //sample query model
        //for strings, "A|B" converts to "column like '%A%' or column like '%B%'
        //for currency, "A|B" converts to "A <= column and column <= B"
        //{
        //    "Start": 0,
        //    "Count": 10,
        //    "OrderByColumn": "Title",
        //    "OrderAscending": true,
        //    "Fuzzy": false,
        //    "Filter": { "Category":"Service|Computer", "ListPrice":"31|34"}
        //}

        model.select = function (id) {
            var product = model.findProduct(id);
            if (null == product)
                return;
            if (product.isSelected)
                product.isSelected = false;
            else
                product.isSelected = true;
        };

        model.deleteSelected = function () {
            var selected = [];
            for (var i = 0; i < model.products.length; i++) {
                if (model.products[i].isSelected)
                    selected.push(model.products[i].Id);
            }
            if (selected.length == 0) {
                alert("Please select at least one product to delete.");
                return;
            }
            if (confirm("This will delete " + selected.length + " selected product(s)!")) {
                model.onStartImport("Deleting " + selected.length + " product(s)...");
                for (var i = 0; i < selected.length; i++) {
                    inventoryService.deleteProduct(selected[i]);
                }
            }
        };

        model.setOrderByColumn = function (columnName) {
            if (model.orderByColumn == columnName) {
                model.orderAscending = !model.orderAscending;
            }
            else {
                model.orderByColumn = columnName;
                model.page = 0;
            }
            model.fetchProducts();
        };

        model.filterProducts = function () {
            for (var propName in model.filter) {
                if (model.filter[propName] === null || model.filter[propName] === undefined || model.filter[propName] === "") {
                    delete model.filter[propName];
                }
            }
            model.activeFilter = model.filter;
            model.page = 0;
            model.tab = 3;
            model.fetchProducts();
            model.fetchPageCount();
        };

        model.clearFilter = function () {
            model.filter = {};
            model.activeFilter = {};
            var img = document.getElementById("filterImage");
            if (img)
                img.src = "";
        };

        model.showFilter = function () {
            model.tab = 4;
            model.filter = model.activeFilter;
        };

        model.showImport = function () {
            model.tab = 1;
        };

        model.showImportImages = function () {
            model.importProgress = "";
            model.tab = 5;
        };

        model.showAddEdit = function (product, editing) {
            model.tab = 2;
            model.product = product;
            model.editing = editing;
        };

        model.showTable = function () {
            model.tab = 3;
            model.product = {};
            model.editing = false;
            model.fetchAll();
        };

        model.showPrototypeTasks = function () {
            model.tab = 7;
        }

        model.clone = function (item) {
            return JSON.parse(JSON.stringify(item));
        };

        model.addProduct = function () {
            //preserve the model.product in case the add operation fails
            $scope.submitted = true;
            if (addProductForm.$valid) {
                var uploadData = model.clone(model.product);
                if (uploadData.Id) {
                    inventoryService.editProduct(uploadData);
                }
                else {
                    inventoryService.addProduct(uploadData);
                }
            }
        };

        model.cancelAddEdit = function () {
            model.showTable();
        }

        model.onStartImport = function (text) {
            model.importProgress = text;
            model.tab = 6;
        };

        model.handleError = function (error) {
            model.tab = 6;
            if (error && error.toLowerCase().indexOf("<html", 0) >= 0) {
                //try to find the error message returned from the server
                try {
                    var parser = new DOMParser();
                    var dom = parser.parseFromString(error, "text/html");
                    var titleError = dom.getElementsByClassName("titleerror");
                    if (titleError) {
                        titleError = titleError.item(0);
                        if (titleError)
                            error = titleError.innerText;
                    }
                }
                catch (x) { }
                model.importProgress += "\n" + error;
            }
            else {
                model.importProgress += "\n" + error;
            }
        };

        model.importFile = function () {
            try {
                var fileinfo = document.getElementById("selectedfile").files[0];
                if (fileinfo == undefined) {
                    alert("Please select a file.");
                    return;
                }
                model.onStartImport("Importing " + fileinfo.name);
                inventoryService.importFile(fileinfo);
            }
            catch (error) {
                alert(error);
            }
        };

        model.importImages = function () {
            var files = document.getElementById("selectedimages").files;
            if (files == undefined || files.length == 0) {
                alert("Please select one or more image files.");
                return;
            }
            model.onStartImport("Importing " + files.length + " image(s)");
            for (var i = 0; i < files.length; i++) {
                var fileInfo = files[i];
                model.importProgress += "\nImporting " + fileInfo.name;
                inventoryService.importImage(fileInfo);
            }
        };

        model.findProduct = function (id) {
            for (var i = 0; i < model.products.length; i++) {
                var item = model.products[i];
                if (item.Id == id) {
                    return item;
                }
            }
            alert("Product " + id + " not found");
        };

        model.edit = function (id) {
            var product = model.findProduct(id);
            if (product)
                model.showAddEdit(model.buildProduct(product), true);
        };

        model.resetDatabase = function () {
            if (confirm("This will delete all records in the database!")) {
                model.onStartImport("Deleting all records in the database...");
                inventoryService.resetDatabase();
            }
        };

        model.delete = function (id) {
            if (confirm("This will delete the selected item!")) {
                inventoryService.deleteProduct(id);
            }
        };

        model.fetchProducts = function () {
            var filter = model.activeFilter;
            console.log(filter);
            inventoryService.fetchProducts(model.page * model.itemsPerPage, model.itemsPerPage, model.orderByColumn, model.orderAscending, filter);
            model.filter = {};
        };

        model.buildProduct = function (item) {
            var result = model.clone(item);
            return result;
        };

        model.debugAlert = function (data) {
            alert(JSON.stringify(data));
        }

        model.FindLookup = function (list, id) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].Id == id)
                    return list[i];
            }
            return {};
        };

        model.fetchAll = function () {
            inventoryService.fetchUnitsOfMeasure();
            inventoryService.fetchProductTypes();
            inventoryService.fetchCategories();
            inventoryService.fetchContracts();
            inventoryService.fetchContractors();
            inventoryService.fetchImageFileNames();

            if (model.tab == 3) {
                model.fetchProducts();
                model.fetchPageCount();
            }

        };

        model.buildFilter = function () {
            var result = {};
            //todo: need to include the filter data here
            return result;
        };

        model.fetchPageCount = function () {
            inventoryService.fetchCount(model.activeFilter);
        };

        model.setPage = function (newPage) {
            if (!newPage || newPage < 0)
                newPage = 0;
            if (newPage > model.pageCount - 1)
                newPage = model.pageCount - 1;
            model.page = newPage;
            model.fetchProducts();
        };

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

        model.createDemoOrders = function () {
            if (model.createCount > 0) {
                model.onStartImport("Preparing to create " + model.createCount + " orders");
                inventoryService.createDemoOrders(model.createCount);
            }
            else {
                model.onStartImport("Please enter the number of items to create.");
            }
        };

        messageService.subscribe('countSuccess', function (response) {
            model.pageCount = Math.ceil(response / model.itemsPerPage);
            model.firstPage();
        })

        messageService.subscribe('countFailure', function (response) {
            model.pageCount = 1;
        })

        messageService.subscribe('importSuccess', function (response) {
            //alert('Import Success\r\n' + response);
            model.importProgress += "\n" + response;
            document.getElementById("fileImportForm").reset();
            model.fetchAll();
        })

        messageService.subscribe('importFailure', function (response) {
            model.handleError(response);
            //model.importProgress += "\nImport Failure: " + response;
        })

        messageService.subscribe('importImageSuccess', function (response) {
            model.importProgress += "\n" + response;
            model.fetchImageFileNames();
        })

        messageService.subscribe('importImageFailure', function (response) {
            model.handleError(response);
        })

        messageService.subscribe('addProductSuccess', function (response) {
            growl.success("Product has been added to the catalog.");
            //alert('Add Product Success');
            model.showTable();
        })

        messageService.subscribe('addProductFailure', function (response) {
            model.handleError(response);
        })

        messageService.subscribe('updateProductSuccess', function (response) {
            growl.success("Product has been added to the catalog.");
            //alert('Update Product Success');
            model.showTable();
        })

        messageService.subscribe('updateProductFailure', function (response) {
            model.handleError(response);
        })

        messageService.subscribe('retrievedUnitsOfMeasure', function (response) {
            model.unitsOfMeasure = response;
        })

        messageService.subscribe('retrievedUnitsOfMeasureFail', function (response) {
            model.unitsOfMeasure = [];
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

        messageService.subscribe('retrievedImageFileNames', function (response) {
            model.imageFileNames = response;
        })

        messageService.subscribe('retrievedImageFileNamesFail', function (response) {
            model.imageFileNames = [];
        })

        messageService.subscribe('querySuccess', function (response) {
            model.products = response;
        })

        messageService.subscribe('queryFailure', function (response) {
            model.products = [];
        })

        messageService.subscribe('deleteSuccess', function (response) {
            if (model.tab == 6) {
                model.importProgress += "\nDeleted Product";
                return;
            }
            model.showTable();
        })

        messageService.subscribe('deleteFailure', function (response) {
            model.handleError(response);
        })

        messageService.subscribe('deleteAllSuccess', function (response) {
            model.importProgress += "\n" + response;
            model.fetchAll();
            model.products = [];
        })

        messageService.subscribe('deleteAllFailure', function (response) {
            model.handleError(response);
        })

        messageService.subscribe('generateOrdersSuccess', function (response) {
            model.importProgress += "\n" + response;
        })

        messageService.subscribe('generateOrdersFailure', function (response) {
            model.handleError(response);
        })

        model.fetchAll();
    };

    module.component("inventory", {
        templateUrl: "app/areas/admin/inventory/inventory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", "growl", controller]

    });

})();
