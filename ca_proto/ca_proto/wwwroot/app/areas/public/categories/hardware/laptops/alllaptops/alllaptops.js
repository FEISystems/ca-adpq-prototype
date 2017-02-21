(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, sampleInventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All Laptops";

        

        this.$routerOnActivate = function (next, previous) {

            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }


            sampleInventoryService.getProduct().get({ category: category}).$promise.then(
                function (data) {
                    var filteredList = data.filter(function(items) { return items.category === "Standard Laptop Config" ||  items.category === "Power Laptop Config" ||  items.category === "Ultralight Laptop Config"});
                    
                    model.products = createRows(filteredList, 4);
                },
                function (error) {
                    alert("Something went wrong!");

                }
            );

        }

    };

    module.component("allLaptops", {
        templateUrl: "app/areas/public/categories/hardware/laptops/alllaptops/alllaptops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "sampleInventoryService", controller]

    });
}())