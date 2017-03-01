(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, orderService) {
        var model = this;
        
        this.$routerOnActivate = function (next, previous) {
            model.productId = next.urlPath.substring(next.urlPath.lastIndexOf("/") + 1);
            model.provider = {};
            model.title = "Order Confirmation";

            $scope.continueShopping = function () {
                $location.path("home");
            }
        };
    };

    module.component("orderConfirmation", {
        templateUrl: "app/areas/authorizeduser/orderconfirmation/orderconfirmation.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "orderService", controller]

    });
}())