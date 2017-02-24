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
            { path: '/products/searchresults', component: 'searchResults', name: 'Search Results'},

            // products
            // // Software
            { path: '/products/software/allsoftware', component: 'allSoftware', name: 'All Software' },   

            // // Hardware
            // // // Desktops   
            { path: '/products/hardware/alldesktops', component: 'allDesktops', name: 'All Desktops' },     
            { path: '/products/hardware/standarddesktops', component: 'standardDesktops', name: 'Standard Desktops' },
            { path: '/products/hardware/powerdesktops', component: 'powerDesktops', name: 'Power Desktops' },
            { path: '/products/hardware/workstations', component: 'workstations', name: 'Workstations' },
            { path: '/products/hardware/thinclientdesktops', component: 'thinClientDesktops', name: 'Thin Client Desktops' },
            { path: '/products/hardware/allinonedesktops', component: 'allInOneDesktops', name: 'All in One Desktops' },
            // // // Laptops
            { path: '/products/hardware/alllaptops', component: 'allLaptops', name: 'All Laptops' },  
            { path: '/products/hardware/standardlaptops', component: 'standardLaptops', name: 'Standard Laptops' },  
            { path: '/products/hardware/powerlaptops', component: 'powerLaptops', name: 'Power Laptops' },  
            { path: '/products/hardware/ultralightlaptops', component: 'ultralightLaptops', name: 'Ultralight Laptops' },  
            { path: '/products/hardware/mobileworkstations', component: 'mobileWorkstations', name: 'Mobile Workstations' },     
            // // // Accessories
            { path: '/products/hardware/allaccessories', component: 'allAccessories', name: 'All Accessories' }, 
            { path: '/products/hardware/desktopaccessories', component: 'desktopAccessories', name: 'Desktop Accessories' }, 
            { path: '/products/hardware/laptopaccessories', component: 'laptopAccessories', name: 'Laptop Accessories' }, 
            { path: '/products/hardware/monitors', component: 'monitors', name: 'Monitors' }, 
            { path: '/products/hardware/miscellaneous', component: 'miscellaneous', name: 'Miscellaneous' },  

            // // Services
            // // // Desktops   
            { path: '/products/services/alldesktopservices', component: 'allDesktopServices', name: 'All Desktop Services' },     
            { path: '/products/services/standarddesktopservices', component: 'standardDesktopServices', name: 'Standard Desktop Services' },
            { path: '/products/services/powerdesktopservices', component: 'powerDesktopServices', name: 'Power Desktop Services' },
            { path: '/products/services/workstationservices', component: 'workstationServices', name: 'Workstation Services' },
            { path: '/products/services/thinclientdesktopservices', component: 'thinClientDesktopServices', name: 'Thin Client Desktop Services' },
            { path: '/products/services/allinonedesktopservices', component: 'allInOneDesktopServices', name: 'All in One Desktop Services' },
            // // // Laptops
            { path: '/products/services/alllaptopservices', component: 'allLaptopServices', name: 'All Laptop Services' },  
            { path: '/products/services/standardlaptopservices', component: 'standardLaptopServices', name: 'Standard Laptop Services' },  
            { path: '/products/services/powerlaptopservices', component: 'powerLaptopServices', name: 'Power Laptop Services' },  
            { path: '/products/services/ultralightlaptopservices', component: 'ultralightLaptopServices', name: 'Ultralight Laptop Services' },  
            { path: '/products/services/mobileworkstationservices', component: 'mobileWorkstationServices', name: 'Mobile Workstation Services' }, 
            // // // Value Added Services
            { path: '/products/services/allvalueaddedservices', component: 'allValueAddedServices', name: 'All VAS' },    
            { path: '/products/services/desktopvalueaddedservices', component: 'desktopValueAddedServices', name: 'Desktop VAS' },    
            { path: '/products/services/laptopvalueaddedservices', component: 'laptopValueAddedServices', name: 'Laptop VAS' },    

            
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
            { path: '/admin/reports', component: 'reports', name: 'Reports' },

            
            // Authorized Users
            { path: '/user/cancelledorderconfirmation', component: 'cancelOrder', name: 'Cancel Order'},
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

