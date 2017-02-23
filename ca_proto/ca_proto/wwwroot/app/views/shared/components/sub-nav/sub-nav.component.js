(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.data = {};
        model.showNavMenu = true;
        model.$onInit = function () {
            $(document).on("mouseup", function () {
                if ($('.usa-accordion-button').attr('aria-expanded') == "true") {
                    $(document).on("click", function () {
                        $('.usa-accordion-button').attr('aria-expanded', 'false')
                        $('.usa-nav-submenu').attr('aria-hidden', 'true')
                        $(document).unbind( "click" );
                    });
                }
            });
        }
        $scope.menuItems = [

        ];

    }

    module.component("subNav", {
        templateUrl: "app/views/shared/components/sub-nav/sub-nav.component.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]
    });

}())