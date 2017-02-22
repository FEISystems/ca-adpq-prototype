(function () {
    "use strict";
    var module = angular.module("caWebApp", ["ngComponentRouter", 'ngAnimate', 'ngResource']);
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


            // Public
            { path: '/aboutus', component: 'aboutUs', name: 'About Us' },
            { path: '/advancedsearch', component: 'advancedSearch', name: 'Advanced Search' },
            { path: '/compare', component: 'compareList', name: 'Compare List' },
            { path: '/contactus', component: 'contactUs', name: 'Contact Us' },
            { path: '/faq', component: 'faq', name: 'FAQ' },
            { path: '/help', component: 'help', name: 'Help' },
            { path: '/home', component: 'home', name: 'Home' },
            { path: '/product/details/:id', component: 'productDetails', name: 'Product Details'},

            // Categories
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
            { path: '/categories/hardware/laptopaccessories', component: 'laptopAccessories', name: 'Laptop Accessories' }, 
            { path: '/categories/hardware/monitors', component: 'monitors', name: 'Monitors' }, 
            { path: '/categories/hardware/miscellaneous', component: 'miscellaneous', name: 'Miscellaneous' },  

            // // Services
            // // // Desktops   
            { path: '/categories/services/alldesktopservices', component: 'allDesktopServices', name: 'All Desktop Services' },     
            { path: '/categories/services/standarddesktopservices', component: 'standardDesktopServices', name: 'Standard Desktop Services' },
            { path: '/categories/services/powerdesktopservices', component: 'powerDesktopServices', name: 'Power Desktop Services' },
            { path: '/categories/services/workstationservices', component: 'workstationServices', name: 'Workstation Services' },
            { path: '/categories/services/thinclientdesktopservices', component: 'thinClientDesktopServices', name: 'Thin Client Desktop Services' },
            { path: '/categories/services/allinonedesktopservices', component: 'allInOneDesktopServices', name: 'All in One Desktop Services' },
            // // // Laptops
            { path: '/categories/services/alllaptopservices', component: 'allLaptopServices', name: 'All Laptop Services' },  
            { path: '/categories/services/standardlaptopservices', component: 'standardLaptopServices', name: 'Standard Laptop Services' },  
            { path: '/categories/services/powerlaptopservices', component: 'powerLaptopServices', name: 'Power Laptop Services' },  
            { path: '/categories/services/ultralightlaptopservices', component: 'ultralightLaptopServices', name: 'Ultralight Laptop Services' },  
            { path: '/categories/services/mobileworkstationservices', component: 'mobileWorkstationServices', name: 'Mobile Workstation Services' }, 
            // // // Value Added Services
            { path: '/categories/services/allvalueaddedservices', component: 'allValueAddedServices', name: 'All VAS' },    
            { path: '/categories/services/desktopvalueaddedservices', component: 'desktopValueAddedServices', name: 'Desktop VAS' },    
            { path: '/categories/services/laptopvalueaddedservices', component: 'laptopValueAddedServices', name: 'Laptop VAS' },    

            
            // Admin
            { path: '/admin/home', component: 'adminHome', name: 'Admin Home' },
            { path: '/admin/login', component: 'adminLogin', name: 'Admin Login'}, //Login Testing Only
            { path: '/admin/adminuser', component: 'adminUser', name: 'Admin User'},
            { path: '/admin/adminusers', component: 'adminUsers', name: 'Admin Users'},
            { path: '/admin/authorizeduser', component: 'authorizedUser', name: 'Authorized User'},
            { path: '/admin/authorizedusers', component: 'authorizedUsers', name: 'Authorized Users'},
            { path: '/admin/inventory', component: 'inventory', name: 'Inventory'},
            { path: '/admin/vendor', component: 'vendor', name: 'Vendor'},
            { path: '/admin/vendors', component: 'vendors', name: 'Vendors'},

            
            // Authorized Users
            { path: '/user/cancelorder', component: 'cancelOrder', name: 'Cancel Order'},
            { path: '/user/cart', component: 'cart', name: 'Cart'},
            { path: '/user/checkout', component: 'checkout', name: 'Checkout'},
            { path: '/user/myaccount', component: 'myAccount', name: 'My Account'},
            { path: '/user/orderconfirmation', component: 'orderConfirmation', name: 'Order Confirmation'},
            { path: '/user/orderdetails', component: 'orderDetails', name: 'Order Details'},
            { path: '/user/orderhistory', component: 'orderHistory', name: 'Order History'},
            { path: '/user/revieworder', component: 'reviewOrder', name: 'Review Order'},


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

