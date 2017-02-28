(function () {
    "use strict";
    var module = angular.module("caWebApp", ["ngComponentRouter", 'ngAnimate', 'ngResource', 'ngStorage']);
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

            //Category Lists
            { path: '/products/hardware/:category', component: 'categoryList', name: 'Hardware List' },  
            { path: '/products/services/:category', component: 'categoryList', name: 'Services List' },              
            { path: '/products/software/:category', component: 'categoryList', name: 'Software List' },  
            
            // Admin
            { path: '/admin/home', component: 'adminHome', name: 'Admin Home'},
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
            { path: '/user/orderfailed', component: 'orderFailed', name: 'Order Failed'},
            { path: '/user/orderdetails', component: 'orderDetails', name: 'Order Details'},
            { path: '/user/orderhistory', component: 'orderHistory', name: 'Order History'},
            { path: '/user/revieworder', component: 'reviewOrder', name: 'Review Order'},


            { path: '/**', redirectTo: ['Home'] }
    ]
    
    });

    module.run(['$rootScope', '$location', 'authenticationService', function ($rootScope, $location, authenticationService) {

        authenticationService.init();
            
        // this.$routerOnActivate = function (next, previous) {
        //         console.log(authenticationService.checkPermissionForView(next));
        //         if (!authenticationService.checkPermissionForView(next)){
        //             event.preventDefault();
        //             $location.path("/home");
        //         }
        //     };
    }]);


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