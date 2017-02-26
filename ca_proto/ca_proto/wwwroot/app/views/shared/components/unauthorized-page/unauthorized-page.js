(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, authenticationService, $element, $rootScope) {
        var model = this;

        $scope.$watch(authenticationService.isLoggedIn, function() {
            if (authenticationService.userHasPermission($scope.authorized)) {
                $element.hide();
            } else {
                $element.show();
            }
        });
        
        
        $rootScope.$on("userLoggedIn", function() {
            $scope.$watch(authenticationService.isLoggedIn, function() {
                if (authenticationService.userHasPermission($scope.authorized)) {
                    $element.hide();
                } else {
                    $element.show();
                }
            });
        });

    };

    module.directive("unauthorizedPage", function () {
        return {
            templateUrl : "app/views/shared/components/unauthorized-page/unauthorized-page.html",
            controller: ["$scope", "authenticationService", "$element", "$rootScope", controller],
            scope: { authorized: '=' }
        }
    });

}())