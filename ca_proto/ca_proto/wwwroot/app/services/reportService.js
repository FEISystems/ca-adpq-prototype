(function () {

    var reportService = function (messageService, $http) {
        var fetchOrderProducts = function (orderProductQuery) {
            $http.post("/api/report/GetOrderProducts", orderProductQuery)
                .success(function (response) {
                    if (response.Error)
                        messageService.publish('getOrderProductsFailure', response.Error);
                    else
                        messageService.publish('getOrderProductsSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getOrderProductsFailure', response);
                });
        };

        return {
            fetchOrderProducts: fetchOrderProducts,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("reportService", reportService);
}())