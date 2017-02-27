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

        var getEndOfDay = function (date) {
            return new Date(date.setHours(24, 0, 0, 0));
        };

        return {
            fetchOrderProducts: fetchOrderProducts,
            getEndOfDay: getEndOfDay,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("reportService", reportService);
}())