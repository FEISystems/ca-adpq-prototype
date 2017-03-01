(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService, orderService, $rootScope) {
        var model = this;
        model.provider = {};
        model.title = "Order Details";
        model.orderTotal = 0;
        model.orderStatuses = [];
        model.order = {};

        this.$routerOnActivate = function (next, previous) {
            orderService.fetchOrderStatuses();

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

                for (var idx = 0; idx < model.order.Items.length; ++idx) {
                    var product = model.order.Items[idx];
                    model.getProduct(product.ProductId);
                }

                for (var idx = 0; idx < model.orderItems.length; ++idx) {
                    var item = model.orderItems[idx];
                    model.orderTotal += item.Price * item.Quantity;
                }
                model.updateOrderStatus();
            });

            //create a function for this in case the order comes back before the order statuses
            model.updateOrderStatus = function () {
                for (var i = 0; i < model.orderStatuses.length; i++) {
                    if (model.orderStatuses[i].Id == model.order.Status) {
                        model.order.Status = model.orderStatuses[i].Description;
                        break;
                    }
                }
            }

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

            messageService.subscribe("fetchOrderStatusSuccess", function (response) {
                model.orderStatuses = response;
                model.updateOrderStatus();
            })
            messageService.subscribe("fetchOrderStatusFailure", function (response) {
                model.orderStatuses = [];
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