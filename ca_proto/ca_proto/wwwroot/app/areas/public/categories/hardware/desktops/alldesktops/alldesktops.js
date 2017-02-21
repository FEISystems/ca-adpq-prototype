(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, sampleInventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All Desktops";

        function createRows(arr, size) {
            var newRow = [];
            for (var i = 0; i < arr.length; i += size) {
                newRow.push(arr.slice(i, i + size));
            }
            return newRow;
        }

       

        sampleInventoryService.getInventory().get().$promise.then(
            function (data) {
                 model.products = createRows(data, 4);
            },
            function (error) {
                alert("Something went wrong!");

            }
        );



    };

    module.component("allDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/alldesktops/alldesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "sampleInventoryService", controller]

    });
}())