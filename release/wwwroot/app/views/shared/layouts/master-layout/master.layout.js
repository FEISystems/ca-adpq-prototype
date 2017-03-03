(function () {
    "use strict";
    var module = angular.module("caWebApp");

    module.component('masterLayout', {
        templateUrl: "app/views/shared/layouts/master-layout/master.layout.html",
        transclude : true
    })
}())