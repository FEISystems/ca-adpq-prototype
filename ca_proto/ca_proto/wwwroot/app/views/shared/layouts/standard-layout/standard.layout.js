(function () {
    "use strict";
    var module = angular.module("caWebApp");

    module.component('standardLayout', {
        templateUrl: "app/views/shared/layouts/standard-layout/standard.layout.html",
        transclude : true
    })
}())