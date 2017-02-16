(function () {

    var inventoryService = function (messageService, $http) {
        var addProduct = function () {
            alert("add product");
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

        return {
            addProduct: addProduct,
            importFile: importFile
        };
    }

    var module = angular.module("caWebApp");
    module.factory("inventoryService", inventoryService);
}())