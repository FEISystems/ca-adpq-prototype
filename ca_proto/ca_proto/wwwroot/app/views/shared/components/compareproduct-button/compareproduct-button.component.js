(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, shoppingCartService, $element, $rootScope, $sessionStorage) {        
        var model = this;

            model.productId = $scope.productId;

            if (!$sessionStorage.compareList) {
                $sessionStorage.compareList = [];
            }

            $scope.addToCompareList = function(productId) {
                
            }

            if ($sessionStorage.compareList) {                 
                if ($.inArray( model.productId, $sessionStorage.compareList ) > -1)  {                    
                    $($element).find("input").prop('checked', true);
                }
            }
        
            $($element).find("input").on("change", function(){

                var checkbox = this;

                if ($(checkbox).is(":checked")) {
                    if (!($.inArray( model.productId, $sessionStorage.compareList ) > -1) && $sessionStorage.compareList.length < 4) {                    
                        $sessionStorage.compareList.push(model.productId);
                    } else {                                     
                        $($element).find("input").prop('checked', false);
                        alert("Only 4 items can be compared at a time.");
                    }
                    
                } else {
                    $sessionStorage.compareList = jQuery.grep($sessionStorage.compareList, function(value) {
                                                    return value != model.productId;
                                                });;
                }
            });
    };

    module.directive("compareProductButton", function () {
        return {
            template: '<div><input type="checkbox" id="compareItem{{$id}}"><label for="compareItem{{$id}}">Compare</label></div>',
            controller: ["$scope", "shoppingCartService", "$element", "$rootScope", "$sessionStorage", controller],
            replace: true,
            scope: { productId: '=' }
        }
    });

}())