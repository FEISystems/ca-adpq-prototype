(function() {
    
    var authenticationService = function (messageService, $http, $sessionStorage, loginService, $rootScope) {

        var init = function(){
            if (isLoggedIn()){
                $rootScope.user = currentUser();
            }
        };
        
        var checkPermissionForView = function(view) {
            if (!view.requiresAuthentication) {
                return true;
            }
            
            return userHasPermissionForView(view);
        };
        
        
        var userHasPermissionForView = function(view){
            if(!isLoggedIn()){
                return false;
            }
            
            if(!view.permissions || !view.permissions.length){
                return true;
            }
            
            return userHasPermission(view.permissions);
        };
        
        
        var userHasPermission = function(permissions){
            if(!isLoggedIn()){
                return false;
            }
            
            var found = false;

            for (var idx = 0; idx < permissions.length; ++idx) {
                var permission = permissions[idx];
                if ($sessionStorage.user.indexOf(permission) >= 0){
                    found = true;
                    return found;
                } 
            }
            
            return found;
        };
        
        
        var currentUser = function(){
            return $sessionStorage.user;
        };
        
        
        var isLoggedIn = function(){
            return $sessionStorage.user != null;
        };
        
    
        return {
            init : init,
            checkPermissionForView : checkPermissionForView,
            userHasPermissionForView : userHasPermissionForView,
            userHasPermission : userHasPermission
        };

    }

    var module = angular.module("caWebApp");
    module.factory("authenticationService", authenticationService);
}())