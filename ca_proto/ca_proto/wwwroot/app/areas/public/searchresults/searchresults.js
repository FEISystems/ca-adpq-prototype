(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, $rootScope, messageService, inventoryService) {
        var model = this;
        model.title = "Search Results";

        function updateQuickSearchResults() {
            if ($rootScope.quickSearchResults && $rootScope.quickSearchResults != "") {

                function createRows(arr, size) {
                    var newRow = [];
                    for (var i = 0; i < arr.length; i += size) {
                        newRow.push(arr.slice(i, i + size));
                    }
                    return newRow;
                }

                model.products = createRows($rootScope.quickSearchResults, 4);
            }
        }
        updateQuickSearchResults();

        $rootScope.$on("newQuickSearch", function(){
            updateQuickSearchResults()
        });

    };

    module.component("searchResults", {
        templateUrl: "app/areas/public/searchresults/searchresults.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "$rootScope", "messageService", "inventoryService", controller]

    });
}())