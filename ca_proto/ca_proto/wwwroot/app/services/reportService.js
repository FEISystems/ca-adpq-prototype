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
            //http://localhost:55327/api/Report/DownloadCSV?start=1%2F1%2F2017&end=3%2F31%2F2017
            //http://localhost:55327/admin/reports/downloadCsv?start=1%2F1%2F2017,end=3%2F31%2F2017
            //http://localhost:55327/api/reports/downloadCsv?start=1%2F1%2F2017&end=3%2F31%2F2017
            var url = "/api/report/downloadCsv?start=" + encodeURIComponent(orderProductQuery.Start) + "&end=" + encodeURIComponent(orderProductQuery.End);
            window.open(url, "[blank]");
        };

        return {
            fetchOrderProducts: fetchOrderProducts,
            getEndOfDay: getEndOfDay,
            downloadCsv: downloadCsv,
        };
    }

    var module = angular.module("caWebApp");
    module.factory("reportService", reportService);
}())