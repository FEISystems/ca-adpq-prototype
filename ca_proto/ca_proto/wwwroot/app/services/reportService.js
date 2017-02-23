(function () {

    var reportService = function (messageService, $http) {

        //var fetchProducts = function (start, count, orderByColumn, orderAscending, filter) {
        //    var postData = { start, count, orderByColumn, orderAscending, filter };
        //    $http.post("/api/inventory/query", postData)
        //        .success(function (response) {
        //            messageService.publish('querySuccess', response);
        //        })
        //        .error(function (response) {
        //            messageService.publish('queryFailure', response);
        //        });
        //}

        return {
        //    fetchProducts: fetchProducts,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("reportService", reportService);
}())