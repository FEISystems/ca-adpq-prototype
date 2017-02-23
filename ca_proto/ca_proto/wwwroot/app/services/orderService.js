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

        var cancelOrder = function (orderId) {
            $http.get("/api/order/cancelorder/" + orderId)
                .success(function (response) {
                    messageService.publish('cancelOrderSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('cancelOrderFailure', response);
                });
        };

        var placeOrder = function (shoppingCartId, paymentMethod) {
            var data = { ShoppingCartId: shoppingCartId, PaymentMethod: paymentMethod };
            $http.post("/api/order/placeorder", data)
                .success(function (response) {
                    messageService.publish('placeOrderSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('placeOrderFailure', response);
                });
        }

        return {
            getOrdersByUserId: getOrdersByUserId,
            cancelOrder: cancelOrder,
            placeOrder: placeOrder
        };
    }

    var module = angular.module("caWebApp");
    module.factory("orderService", orderService);
}())