(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, sampleInventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Home";
        
        // sampleInventoryService.getInventory().get().$promise.then(
        //     function( data ) {
        //         model.products = data;
        //     },
        //     function( error ) {
        //         alert( "Something went wrong!" );

        //     }
        // );

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
        controller: ["$scope", "$location", "sampleInventoryService", controller]

    });
}())