(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Product Details";

    };

    module.component("productDetails", {
        templateUrl: "app/areas/public/productdetails/productdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())