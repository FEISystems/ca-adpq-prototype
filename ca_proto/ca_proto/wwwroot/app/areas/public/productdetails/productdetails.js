(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $route, sampleInventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Product Details";

        //console.log($route);

        this.$routerOnActivate = function(next, previous) {
            var id = next.params.id;
            console.log(id);

            
            sampleInventoryService.getProduct().get({ id : id }).$promise.then(
                function (data) {
                    var idx = data.map(function(item) { return item.sku}).indexOf(id);
                    model.product = data[idx];
                },
                function (error) {
                    alert("Something went wrong!");

                }
            );
            
            // return heroService.getHero(id).then(function(hero) {
            // $ctrl.hero = hero;
            // });
        }

    };

    module.component("productDetails", {
        templateUrl: "app/areas/public/productdetails/productdetails.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$route", "sampleInventoryService", controller]

    });
}())