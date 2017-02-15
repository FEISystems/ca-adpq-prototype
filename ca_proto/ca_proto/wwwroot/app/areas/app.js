(function () {
    "use strict";
    var module = angular.module("caWebApp", ["ngComponentRouter", 'ngAnimate']);
    window.document.title = 'CA Prototype';
    module.value("$routerRootComponent", "caWebApp");

    var controller = function (roleService) {
        var model = this;
        model.$onInit = function () {
            //Do Something
        }
    };

    module.component("caWebApp", {
        controller: controller,
        bindings: {
            userRole: "@"
        },
        template: '<master-layout>' +
                        '<ng-outlet style="display: block"></ng-outlet>' +
                    '</master-layout>'
            ,
        $routeConfig: [
            { path: '/home', component: 'home', name: 'Home' },
            { path: '/adminlogin', component: 'adminLogin', name: 'Admin Login' },
            { path: '/aboutus', component: 'aboutUs', name: 'About Us' },
            { path: '/help', component: 'help', name: 'Help' },
            { path: '/cart', component: 'cart', name: 'Cart' },
            { path: '/compare', component: 'compareList', name: 'Compare List' },
            { path: '/advancedsearch', component: 'advancedSearch', name: 'Advanced Search' },
            { path: '/**', redirectTo: ['Home'] }
    ]
    });

}());


function getSrv(name, element) {
    element = element || '*[ng-app]';
    return angular.element(element).injector().get(name);
}

//Dealing with IE compatibility
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.toTitleCase) {
    String.prototype.toTitleCase = function(){
      return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
}

