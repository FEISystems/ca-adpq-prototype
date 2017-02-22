(function () {
    "use strict";
    var module = angular.module("caWebApp");

    module.directive('asideLayout', function() {
        return {
            templateUrl: "app/views/shared/layouts/aside-layout/aside.layout.html",
            transclude : {
                "aside-panel": 'asidePanel',
                "body-panel": 'bodyPanel'
            }
        }
        
    })
}())