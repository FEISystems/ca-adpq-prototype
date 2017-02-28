(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, orderService) {
        var model = this;
        model.orderStatuses = [];

        model.title = "Order History";

        orderService.getOrdersByUserId();
        orderService.fetchOrderStatuses();

        model.findStatus = function (statusId) {
            for (var i = 0; i < model.orderStatuses.length; i++) {
                if (model.orderStatuses[i].Id == statusId)
                    return model.orderStatuses[i].Description;
            }
            return statusId;
        };

        messageService.subscribe("getOrdersByUserIdSuccess", function (response) {
            model.orders = response;
            for (var i = 0; i < response.length; i++) {
                response[i].Status = model.findStatus(response[i].Status);
            }
        })
        messageService.subscribe("getOrdersByUserIdFailure", function (response) {
            model.orders = [];
        })

        messageService.subscribe("fetchOrderStatusSuccess", function (response) {
            model.orderStatuses = response;
        })
        messageService.subscribe("fetchOrderStatusFailure", function (response) {
            model.orderStatuses = [];
        })


    };

    module.component("orderHistory", {
        templateUrl: "app/areas/authorizeduser/orderhistory/orderhistory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "orderService", controller]

    });
}())