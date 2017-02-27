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

        var downloadCsv = function (orderProductQuery) {
            var url = "/api/report/downloadCsv?start=" + encodeURIComponent(orderProductQuery.Start) + "&end=" + encodeURIComponent(orderProductQuery.End);
            window.open(url, "[blank]");
        };

        var fetchOrderStatuses = function () {
            fetchLookups("OrderStatusSimple");
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

        return {
            fetchOrderProducts: fetchOrderProducts,
            getEndOfDay: getEndOfDay,
            downloadCsv: downloadCsv,
            fetchOrderStatuses: fetchOrderStatuses,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("reportService", reportService);
}())