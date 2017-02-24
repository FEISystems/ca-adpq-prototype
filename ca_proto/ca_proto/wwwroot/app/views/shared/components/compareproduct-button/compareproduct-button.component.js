(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, $element, $rootScope) {
        var model = this;
        model.productId = $scope.productId

        if (!$rootScope.compareList) {
            $rootScope.compareList = []
        }

        $scope.addToCompareList = function(productId) {
            
        }

        if (model.productId in $rootScope.compareList)  {                    
            $element.find("input").prop('checked', true);
        }

        $element.find("input").on("change", function(){
            var checkbox = this;
            if ($(checkbox).is(":checked")) {
                if (!(model.productId in $rootScope.compareList) && $rootScope.compareList.length < 4) {                    
                    $rootScope.compareList.push(model.productId);
                } else {                                     
                    $element.find("input").prop('checked', false);
                    alert("Only 4 items can be compared at a time.");
                }
                
            } else {
                $rootScope.compareList = jQuery.grep($rootScope.compareList, function(value) {
                                            return value != model.productId;
                                        });;
            }
        });
    };

    module.directive("compareProductButton", function () {
        return {
            template: '<div><input type="checkbox" id="compareItem{{$id}}"><label for="compareItem{{$id}}">Compare</label></div>',
            controller: ["$scope", "shoppingCartService", "$element", "$rootScope", controller],
            replace: true,
            scope: { productId: '=' }
        }
    });

}())