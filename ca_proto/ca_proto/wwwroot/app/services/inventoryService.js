(function () {

    var inventoryService = function (messageService, $http) {
        var addProduct = function () {
            alert("add product");
        };

        var importFile = function (fileinfo) {
            //var fd = new FormData();
            //fd.append('file', fileinfo);
            ////var fd = { file: fileinfo };
            ////alert(fd.file);

            //$http.post("/api/inventory/import", fd, {
            //    transformRequest: angular.identity,
            //    headers: { 'Content-Type': undefined }
            //})
            //    .success(function (response) {
            //        messageService.publish('importSuccess', response);
            //    })
            //    .error(function (response) {
            //        messageService.publish('importFailure', response);
            //    });

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
            //r.readAsBinaryString(fileinfo);
            r.readAsText(fileinfo);
            //r.readAsArrayBuffer(fileinfo);
        };

        return {
            addProduct: addProduct,
            importFile: importFile
        };
    }

    var module = angular.module("caWebApp");
    module.factory("inventoryService", inventoryService);
}())