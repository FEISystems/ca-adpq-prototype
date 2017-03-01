(function () {

    var inventoryService = function (messageService, $http) {
        var addProduct = function (product) {
            $http.post("/api/inventory/add", product)
                .success(function (response) {
                    if (response.Error)
                        messageService.publish('addProductFailure', response.Error);
                    else
                        messageService.publish('addProductSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('addProductFailure', response);
                });
        };

        var editProduct = function (product) {
            $http.post("/api/inventory/update", product)
                .success(function (response) {
                    if (response.Error)
                        messageService.publish('updateProductFailure', response.Error);
                    else
                        messageService.publish('updateProductSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('updateProductFailure', response);
                });
        };

        var deleteProduct = function (id) {
            $http.post("/api/inventory/delete", id)
                .success(function (response) {
                    if (response.Error)
                        messageService.publish('deleteFailure', response.Error);
                    else
                        messageService.publish('deleteSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('deleteFailure', response);
                });
        };

        var resetDatabase = function () {
            $http.post("/api/prototype/DeleteAllEntities")
                .success(function (response) {
                    if (response.Error)
                        messageService.publish('deleteAllFailure', response.Error);
                    else
                        messageService.publish('deleteAllSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('deleteAllFailure', response);
                });            
        };

        var createDemoOrders = function (count) {
            $http.post("/api/prototype/GenerateOrders", count)
                .success(function (response) {
                    if (response.Error)
                        messageService.publish('generateOrdersFailure', response.Error);
                    else
                        messageService.publish('generateOrdersSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('generateOrdersFailure', response);
                });
        }

        var importFile = function (fileinfo) {
            var r = new FileReader();
            r.onloadend = function (e) {
                var data = e.target.result;
                var postData = { content: data };
                $http.post("/api/inventory/import", postData)
                    .success(function (response) {
                        if (response.Error)
                            messageService.publish('importFailure', response.Error);
                        else
                            messageService.publish('importSuccess', response);
                    })
                    .error(function (response) {
                        messageService.publish('importFailure', response);
                    });
            }
            r.readAsText(fileinfo);
        };

        var importImage = function (fileinfo) {
            var r = new FileReader();
            r.onloadend = function (e) {
                var data = new Uint8Array(e.target.result, 0, e.target.result.length);
                var postData = { ImageFileName:fileinfo.name, Buffer: data };
                $http.post("/api/image/add", postData)
                    .success(function (response) {
                        if (response.Error)
                            messageService.publish('importImageFailure', response.Error);
                        else
                            messageService.publish('importImageSuccess', response);
                    })
                    .error(function (response) {
                        messageService.publish('importImageFailure', response);
                    });
            }
            r.readAsArrayBuffer(fileinfo);
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

        var fetchImageFileNames = function () {
            fetchLookups("ImageFileNames");
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
            var postData = { start, count, orderByColumn, orderAscending, filter};
            $http.post("/api/inventory/query", postData)
                .success(function (response) {
                    messageService.publish('querySuccess', response);
                })
                .error(function (response) {
                    messageService.publish('queryFailure', response);
                });
        }

        var advancedSearch = function (name, category, minPrice, maxPrice, manufacturer, manufacturerPartNumber, sku) {
            var postData = {
                Name: name,
                Category: category,
                MinPrice: minPrice,
                MaxPrice: maxPrice,
                Manufacturer: manufacturer,
                ManufacturerPartNumber: manufacturerPartNumber,
                SKU: sku
            };
            $http.post("/api/inventory/advancedsearch", postData)
                .success(function (response) {
                    //at this point we'd want to load a new component that represents the search results page
                    messageService.publish('advancedsearchSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('advancedsearchFailure', response);
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

        
        var getProduct = function (id) {
            $http.get("/api/inventory/" + id)
                .success(function (response) {
                    messageService.publish('getProductSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getProductFailure', response);
                });
        };


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
            advancedSearch: advancedSearch,
            fetchCount : fetchCount,
            getProduct: getProduct,
            importImage: importImage,
            fetchImageFileNames: fetchImageFileNames,
            resetDatabase: resetDatabase,
            createDemoOrders: createDemoOrders
        };
    }

    var module = angular.module("caWebApp");
    module.factory("inventoryService", inventoryService);
}())