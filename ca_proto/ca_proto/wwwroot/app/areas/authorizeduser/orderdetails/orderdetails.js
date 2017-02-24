(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, orderService, $rootScope) {
        var model = this;
        model.provider = {};
        model.title = "Order Details";
        this.$routerOnActivate = function (next, previous) {
            model.orderId = parseInt(next.params.id);


            model.getOrder = function () {                
                orderService.getOrder(model.orderId);
            };

            model.getOrder();



            messageService.subscribe("getOrderSuccess", function (response) {
                model.order = response;
            })
            messageService.subscribe("getOrderFailure", function (response) {
                model.order = {};
            })


        }



    };

    module.component("orderDetails", {
        templateUrl: "app/areas/authorizeduser/orderdetails/orderdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "orderService", "$rootScope", controller]

    });
}())