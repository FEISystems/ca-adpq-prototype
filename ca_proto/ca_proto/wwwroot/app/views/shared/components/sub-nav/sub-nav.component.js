(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.data = {};
        model.showNavMenu = true;
        model.$onInit = function () {
            $(document).on("mouseup", function () {
                $('.usa-accordion-button').each(function(){
                    var accordionbutton = this;
                    if ($(accordionbutton).attr('aria-expanded') == "true") {
                        $(document).on("click", function () {
                        $(accordionbutton).attr('aria-expanded', 'false')
                        $(accordionbutton).next('.usa-nav-submenu').attr('aria-hidden', 'true')
                        $(document).unbind( "click" );
                    });
                }
                });
            
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