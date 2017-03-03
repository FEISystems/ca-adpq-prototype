(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, messageService, $location, inventoryService, $rootScope) {
        var model = this;
        model.data = {};
        model.quickSearch = '';
        model.brandName = 'CA Prototype';
        model.showNavMenu = true;
        model.$onInit = function () {
        }


        model.doQuickSearch = function () {
            var searchTerms = model.quickSearch;
            inventoryService.quickSearch(searchTerms);
        }

        messageService.subscribe("quicksearchSuccess", function (response) {
            $rootScope.quickSearchResults = [];
            $rootScope.quickSearchResults = response;
            console.log($rootScope.quickSearchResults);
            if ($location.path() != "/products/searchresults") {
                $location.path("/products/searchresults");
            } else {
                $rootScope.$broadcast("newQuickSearch");
            }
        });
        messageService.subscribe("quicksearchFailure", function (response) {
            $rootScope.quickSearchResults = "";
        });
    }

    module.component("masthead", {
        templateUrl: "app/views/shared/components/masthead/masthead.component.html",
        controllerAs: "model",
        controller: ["$scope", "messageService", "$location", "inventoryService", "$rootScope", controller]
    });

}())