(function () {
    "use strict";
    var module = angular.module("caWebApp", ["ngComponentRouter", 'ngAnimate']);
    window.document.title = 'CA Prototype';
    module.value("$routerRootComponent", "caWebApp");

    var controller = function () {
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
                        '<modal></modal>' +
                        '<ng-outlet style="display: block"></ng-outlet>' +                        
                    '</master-layout>'
            ,
        $routeConfig: [

            { path: '/home', component: 'home', name: 'Home' },

            // Main Navigation
            { path: '/adminlogin', component: 'adminLogin', name: 'Admin Login' },
            { path: '/admininventory', component: 'adminInventory', name: 'Admin Inventory' },
            { path: '/aboutus', component: 'aboutUs', name: 'About Us' },
            { path: '/help', component: 'help', name: 'Help' },
            { path: '/cart', component: 'cart', name: 'Cart' },
            { path: '/compare', component: 'compareList', name: 'Compare List' },
            { path: '/advancedsearch', component: 'advancedSearch', name: 'Advanced Search' },

            // Sub Navigation
            // // Software
            { path: '/categories/software/allsoftware', component: 'allSoftware', name: 'All Software' },   

            // // Hardware
            // // // Desktops
            { path: '/categories/hardware/alldesktops', component: 'allDesktops', name: 'All Desktops' },     
            { path: '/categories/hardware/standarddesktops', component: 'standardDesktops', name: 'Standard Desktops' },
            { path: '/categories/hardware/powerdesktops', component: 'powerDesktops', name: 'Power Desktops' },
            { path: '/categories/hardware/workstations', component: 'workstations', name: 'Workstations' },
            { path: '/categories/hardware/thinclientdesktops', component: 'thinClientDesktops', name: 'Thin Client Desktops' },
            { path: '/categories/hardware/allinonedesktops', component: 'allInOneDesktops', name: 'All in One Desktops' },
            // // // Laptops
            { path: '/categories/hardware/alllaptops', component: 'allLaptops', name: 'All Laptops' },  
            { path: '/categories/hardware/standardlaptops', component: 'standardLaptops', name: 'Standard Laptops' },  
            { path: '/categories/hardware/powerlaptops', component: 'powerLaptops', name: 'Power Laptops' },  
            { path: '/categories/hardware/ultralightlaptops', component: 'ultralightLaptops', name: 'Ultralight Laptops' },  
            { path: '/categories/hardware/mobileworkstations', component: 'mobileWorkstations', name: 'Mobile Workstations' },     
            // // // Accessories
            { path: '/categories/hardware/allaccessories', component: 'allAccessories', name: 'All Accessories' }, 
            { path: '/categories/hardware/desktopaccessories', component: 'desktopAccessories', name: 'Desktop Accessories' }, 
            { path: '/categories/hardware/laptopsaccessories', component: 'laptopAccessories', name: 'Laptop Accessories' }, 
            { path: '/categories/hardware/miscellaneous', component: 'miscellaneous', name: 'Miscellaneous' },  

                 
            { path: '/product/details', component: 'productDetails', name: 'Product Details'},

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

