(function () {
    var orderService = function (messageService, $http) {
        var getOrdersByUserId = function (userId) {
            $http.get("/api/order/getuserorders/" + userId)
                .success(function (response) {
                    messageService.publish('getOrdersByUserIdSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getOrdersByUserIdFailure', response);
                });
        };

        return {
            getOrdersByUserId: getOrdersByUserId
        };
    }

    var module = angular.module("caWebApp");
    module.factory("orderService", orderService);
}())