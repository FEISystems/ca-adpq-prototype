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
            $http.get("/api/inventory/productTypes")
                .success(function (response) {
                    messageService.publish('retrievedProductTypes', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedProductTypesFail', response);
                });
        };

        var fetchCategories = function () {
            $http.get("/api/category/lookups")
                .success(function (response) {
                    messageService.publish('retrievedCategories', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedCategoriesFail', response);
                });
        };

        var fetchContracts = function () {
            $http.get("/api/contract/lookups")
                .success(function (response) {
                    messageService.publish('retrievedContracts', response);
                })
                .error(function (response) {
                    messageService.publish('retrievedContractsFail', response);
                });
        };

        return {
            addProduct: addProduct,
            importFile: importFile,
            fetchProductTypes: fetchProductTypes,
            fetchCategories: fetchCategories,
            fetchContracts: fetchContracts,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("inventoryService", inventoryService);
}())