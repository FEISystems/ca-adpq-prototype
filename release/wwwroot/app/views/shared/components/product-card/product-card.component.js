(function() {
    "use strict";
    var module = angular.module("caWebApp");

    module.directive("productCard", function() {
        return {
            templateUrl: "app/views/shared/components/product-card/product-card.component.html"
        }
    });

}())