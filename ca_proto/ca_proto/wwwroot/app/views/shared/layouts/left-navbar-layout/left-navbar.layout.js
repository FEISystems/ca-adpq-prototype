(function () {
  "use strict";
  var module = angular.module("caWebApp");

  module.component('leftNavbarLayout', {
      templateUrl: "app/views/shared/layouts/left-navbar-layout/left-navbar.layout.html",
      transclude: {
        "aside-panel": 'asidePanel',
        "body-panel": 'bodyPanel'
      }
  })
}())