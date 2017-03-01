(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, orderService) {
        var model = this;
        model.provider = {};
        model.orderNumbers = [];
        model.title = "Order Confirmation";

        orderService.getOrdersByUserId();

        model.findOrderNumber = function (orderNumberId) {
            model.orderNumbers = response;
        }

        $scope.continueShopping = function() {
            $location.path("home");
        }

        messageService.subscribe("getOrdersByUserIdSuccess", function (response) {
            model.orderNumbers = response;
            for (var i = 0; i < response.length; i++) {
                response[i] = model.findOrderNumber(response[i]);
            }
        })

    };

    module.component("orderConfirmation", {
        templateUrl: "app/areas/authorizeduser/orderconfirmation/orderconfirmation.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "orderService", controller]

    });
}())