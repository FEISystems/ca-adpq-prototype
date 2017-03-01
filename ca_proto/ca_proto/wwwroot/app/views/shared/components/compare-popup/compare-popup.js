(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, messageService, $element, compareService, $rootScope, $timeout) {
        var model = this;
        model.provider = {};
        model.title = "Compare List";
        model.products = [];
        model.button = $element.find("a");
        model.popup = $element.find("#comparePopup");
        model.showpopup = false;


        compareService.refreshCompareList();


        model.togglePopup = function () {
            if (model.button.attr('aria-expanded') == "false") {
                model.button.attr('aria-expanded', 'true');
                model.popup.attr('aria-hidden', 'false');
                model.showpopup = true;
            } else {
                model.button.attr('aria-expanded', 'false');
                model.popup.attr('aria-hidden', 'true');
                model.showpopup = false;
            }
        }


        $scope.showDivider = function () {
            return model.products.length > 1;
        }

        model.removeFromCompare = function (productId) {
            compareService.removeCompareItem(productId);
        };

        
        $rootScope.$on("clearCompareItems", function(){
            model.products = [];
            $timeout(function(){
                $scope.$apply();
            });
        });

        messageService.subscribe('getCompareProductSuccess', function (response) {
            model.products.push(response);
        })
        
    };

    module.component("comparePopup", {
        templateUrl: "app/views/shared/components/compare-popup/compare-popup.html",
        controllerAs: "model",
        controller: ["$scope", "messageService", "$element", "compareService", "$rootScope", "$timeout", controller]

    });
}())