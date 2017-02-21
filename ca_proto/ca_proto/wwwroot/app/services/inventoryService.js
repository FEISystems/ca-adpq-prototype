(function () {

    var inventoryService = function (messageService, $http) {
        var addProduct = function (product) {
            $http.post("/api/inventory/add", product)
                .success(function (response) {
                    messageService.publish('addProductSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('addProductFailure', response);
                });
        };

        var editProduct = function (product) {
            $http.post("/api/inventory/update", product)
                .success(function (response) {
                    messageService.publish('updateProductSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('updateProductFailure', response);
                });
        };

        var deleteProduct = function (id) {
            $http.post("/api/inventory/delete", id)
                .success(function (response) {
                    messageService.publish('deleteSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('deleteFailure', response);
                });
        };

        var importFile = function (fileinfo) {
            var r = new FileReader();
            r.onloadend = function (e) {
                var data = e.target.result;
                var postData = { content: data };
                $http.post("/api/inventory/import", postData)
                    .success(function (response) {
                        messageService.publish('importSuccess', response);
                    })
                    .error(function (response) {
                        messageService.publish('importFailure', response);
                    });
            }
            r.readAsText(fileinfo);
        };

        var fetchProductTypes = function () {
            $http.get("/api/lookups/productTypes")
                .success(function (response) {
                    messageService.publish('retrievedProductTypes', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedProductTypesFail', response);
                });
        };

        var fetchCategories = function () {
            $http.get("/api/lookups/categories")
                .success(function (response) {
                    messageService.publish('retrievedCategories', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedCategoriesFail', response);
                });
        };

        var fetchContracts = function () {
            $http.get("/api/lookups/contracts")
                .success(function (response) {
                    messageService.publish('retrievedContracts', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedContractsFail', response);
                });
        };

        var fetchContractors = function () {
            $http.get("/api/lookups/contractors")
                .success(function (response) {
                    messageService.publish('retrievedContractors', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedContractorsFail', response);
                });
        };

        var fetchProducts = function (start, count, orderByColumn, orderAscending) {
            var postData = { start: start, count: count, orderByColumn: orderByColumn, orderAscending: orderAscending };
            $http.post("/api/inventory/query", postData)
                .success(function (response) {
                    messageService.publish('querySuccess', response);
                })
                .error(function (response) {
                    messageService.publish('queryFailure', response);
                });
        }

        var quickSearch = function (terms) {
            
            var postData = { SearchTerm: terms };
            $http.post("/api/inventory/quicksearch", postData)
                .success(function (response) {
                    //at this point we'd want to load a new component that represents the search results page
                    messageService.publish('quicksearchSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('quicksearchFailure', response);
                });
        }

        return {
            addProduct: addProduct,
            importFile: importFile,
            fetchProductTypes: fetchProductTypes,
            fetchCategories: fetchCategories,
            fetchContracts: fetchContracts,
            fetchProducts: fetchProducts,
            editProduct: editProduct,
            deleteProduct: deleteProduct,
            quickSearch: quickSearch
        };
    }

    var module = angular.module("caWebApp");
    module.factory("inventoryService", inventoryService);
}())