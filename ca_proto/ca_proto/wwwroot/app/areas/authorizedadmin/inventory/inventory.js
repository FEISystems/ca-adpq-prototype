(function () {
    'use strict';
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.product = {};
        model.provider = {};
        model.title = "Admin Product Management";

        model.addProduct = function () {
            inventoryService.addProduct(model.product);
        };

        model.importFile = function () {
            var fileinfo = document.getElementById("selectedfile").files[0];
            if (fileinfo == undefined)
            {
                alert("Please select a file.");
                return;
            }
            inventoryService.importFile(fileinfo);
        };

        messageService.subscribe('importSuccess', function (response) {
            alert('Import Success');
            document.getElementById("fileImportForm").reset();
        })

        messageService.subscribe('importFailure', function (response) {
            alert('Import Failure: ' + response);
        })

        messageService.subscribe('addProductSuccess', function (response) {
            alert('Add Product Success');
            model.product = {};
        })

        messageService.subscribe('addProductFailure', function (response) {
            alert('Add Product Failure');
        })
    };

    module.component("adminInventory", {
        templateUrl: "app/areas/authorizedadmin/inventory/inventory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });

})();
