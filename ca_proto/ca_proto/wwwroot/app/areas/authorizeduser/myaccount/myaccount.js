(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "My Account";

    };

    module.component("myAccount", {
        templateUrl: "app/areas/authorizeduser/myaccount/myaccount.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())