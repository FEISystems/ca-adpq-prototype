(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, authenticationService, $element, $rootScope) {
        var model = this;

        $scope.$watch(authenticationService.isLoggedIn, function() {
            if (authenticationService.userHasPermission($scope.permission)) {
                $element.show();
            } else {
                $element.hide();
            }
        });
        
        
        $rootScope.$on("userLoggedIn", function() {
            $scope.$watch(authenticationService.isLoggedIn, function() {
                if (authenticationService.userHasPermission($scope.permission)) {
                    $element.show();
                } else {
                    $element.hide();
                }
            });
        });

    };

    module.directive("permission", function () {
        return {
            controller: ["$scope", "authenticationService", "$element", "$rootScope", controller],
            restrict: 'A',
            scope: { permission: '=' }
        }
    });

}())