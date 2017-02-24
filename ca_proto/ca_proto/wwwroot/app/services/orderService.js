(function () {
    var orderService = function (messageService, $http) {
        var getOrdersByUserId = function () {
            $http.get("/api/order/getuserorders")
                .success(function (response) {
                    messageService.publish('getOrdersByUserIdSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getOrdersByUserIdFailure', response);
                });
        };

        var getOrder = function (orderId) {
            $http.get("/api/order/" + orderId)
                .success(function (response) {
                    messageService.publish('getOrderSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getOrderFailure', response);
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

        var placeOrder = function (shoppingCartId, paymentMethod, address1, address2, address3, city, state, zip, emailAddress) {
            var data = {
                ShoppingCartId: shoppingCartId,
                PaymentMethod: paymentMethod,
                Address1: address1,
                Address2: address2,
                Address3: address3,
                City: city,
                State: state,
                PostalCode: zip,
                EmailAddress: emailAddress
            };
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
            placeOrder: placeOrder,
            getOrder: getOrder
        };
    }

    var module = angular.module("caWebApp");
    module.factory("orderService", orderService);
}())