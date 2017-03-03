(function () {
    "use strict";
    var module = angular.module("caWebApp");

    module.component('searchLayout', {
        templateUrl: "app/views/shared/layouts/search-layout/search.layout.html",
        transclude: {
            "search-panel": 'searchPanel',
            "results-panel": 'resultsPanel'
        }
    })
}())