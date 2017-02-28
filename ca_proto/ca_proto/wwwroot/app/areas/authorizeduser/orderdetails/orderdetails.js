(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService, orderService, $rootScope) {
        var model = this;
        model.provider = {};
        model.title = "Order Details";
        model.orderTotal = 0;


        this.$routerOnActivate = function (next, previous) {



            model.orderId = parseInt(next.params.id);

            

            model.cancelOrder = function() {
                orderService.cancelOrder(model.orderId);
            };



            model.getOrder = function () {
                orderService.getOrder(model.orderId);
            };

            model.getOrder();

            model.getProduct = function (productId) {
                inventoryService.getProduct(productId);
            };


            messageService.subscribe("getOrderSuccess", function (response) {
                model.order = response;
                model.orderItems = [];
                model.products = [];
                model.orderItems = model.order.Items;

                for (var idx = 0; idx < model.order.Items; ++idx) {
                    var product = model.order.Items[idx];
                    model.getProduct(product.ProductId);
                }

                for (var idx = 0; idx < model.orderItems; ++idx) {
                    var item = model.orderItems[idx];
                    model.orderTotal += item.Price * item.Quantity;
                }
            });

            messageService.subscribe("getOrderFailure", function (response) {
                model.order = {};
            });

            messageService.subscribe('getProductSuccess', function (response) {
                model.products.push(response);
            });

            messageService.subscribe('getProductFailure', function (response) {
                model.products = [];

            });
            

            messageService.subscribe('cancelOrderSuccess', function (response) {
                $location.path("user/cancelledorderconfirmation");
            })

            messageService.subscribe('cancelOrderFailure', function (response) {
                model.products = [];

            })


            $scope.showDivider = function () {
                return model.orderItems.length > 1;
            }


        }



    };

    module.component("orderDetails", {
        templateUrl: "app/areas/authorizeduser/orderdetails/orderdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", "orderService", "$rootScope", controller]

    });
}())