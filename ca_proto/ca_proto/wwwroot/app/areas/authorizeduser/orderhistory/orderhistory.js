(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, orderService) {
        var model = this;

        model.title = "Order History";

        orderService.getOrdersByUserId(4);

        messageService.subscribe("getOrdersByUserIdSuccess", function (response) {
            model.orders = response;
        })
        messageService.subscribe("getOrdersByUserIdFailure", function (response) {
            model.orders = [];
        })

        $scope.viewOrder = function(orderId) {
            $rootScope.orderId = orderId;
            $location.path("user/orderdetails");
        }



    };

    module.component("orderHistory", {
        templateUrl: "app/areas/authorizeduser/orderhistory/orderhistory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "orderService", controller]

    });
}())