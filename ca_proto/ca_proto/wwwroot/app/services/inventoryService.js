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
            fetchLookups("ProductTypes");
        };

        var fetchUnitsOfMeasure = function () {
            fetchLookups("UnitsOfMeasure");
        };

        var fetchCategories = function () {
            fetchLookups("Categories");
        };

        var fetchContracts = function () {
            fetchLookups("Contracts");
        };

        var fetchContractors = function () {
            fetchLookups("Contractors");
        };

        var fetchLookups = function (lookupName) {
            $http.get("/api/lookups/" + lookupName)
                .success(function (response) {
                    messageService.publish('retrieved' + lookupName, response);
                })
                .error(function (response) {
                    messageService.publish('retrieved' + lookupName + 'Fail', response);
                });
        }

        var fetchProducts = function (start, count, orderByColumn, orderAscending, filter) {
            var postData = { start: start, count: count, orderByColumn: orderByColumn, orderAscending: orderAscending, filter: filter };
            //alert(JSON.stringify( postData));
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

        var fetchCount = function (filter) {
            $http.post("/api/inventory/count", filter)
                .success(function (response) {
                    //at this point we'd want to load a new component that represents the search results page
                    messageService.publish('countSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('countFailure', response);
                });
        }

        return {
            addProduct: addProduct,
            importFile: importFile,
            fetchUnitsOfMeasure : fetchUnitsOfMeasure,
            fetchProductTypes: fetchProductTypes,
            fetchCategories: fetchCategories,
            fetchContracts: fetchContracts,
            fetchContractors : fetchContractors,
            fetchProducts: fetchProducts,
            editProduct: editProduct,
            deleteProduct: deleteProduct,
            quickSearch: quickSearch,
            fetchCount : fetchCount,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("inventoryService", inventoryService);
}())