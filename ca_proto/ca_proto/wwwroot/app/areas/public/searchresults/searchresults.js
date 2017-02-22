(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $route, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Search Results";


        //console.log($route);

        this.$routerOnActivate = function(next, previous) {
            model.productId = parseInt(next.params.id);


            // sampleInventoryService.getProduct().get({ id : id }).$promise.then(
            //     function (data) {
            //         var idx = data.map(function(item) { return item.sku}).indexOf(id);
            //         model.product = data[idx];
            //     },
            //     function (error) {
            //         alert("Something went wrong!");

            //     }
            // );

            model.getProduct = function () {
                inventoryService.getProduct(model.productId);
            };

            model.getProduct();


            messageService.subscribe('getProductSuccess', function (response) {
                model.product = response;

            })

            messageService.subscribe('getProductFailure', function (response) {
                model.product = {};
            })


        }

    };

    module.component("searchResults", {
        templateUrl: "app/areas/public/searchresults/searchresults.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$route", "messageService", "inventoryService", controller]

    });
}())