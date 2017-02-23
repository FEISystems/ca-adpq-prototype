(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Home";

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 20;

        
        this.$routerOnActivate = function (next, previous) {
            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }

            model.fetchProducts = function () {
                inventoryService.fetchProducts(model.page * model.pageCount, model.pageCount, model.orderByColumn, model.orderAscending);
            };
            
            model.fetchProducts();


            messageService.subscribe('querySuccess', function (response) {
                model.products = createRows(response, 4);
            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })


        }

        model.$onInit = function() {

            var mySwiper = new Swiper ('.swiper-container', {
                                loop: true,
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                            })     

            $("#test").multiselect();
        }

    };

    module.component("home", {
        templateUrl: "app/areas/public/home/home.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService","inventoryService", controller]

    });
}())