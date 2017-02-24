(function() {
    
    var loginService = function (messageService, $http) {
        
        var login = function (username, password) {
            var creds = {username: username, password: password };
            $http.post("/api/authentication", creds)
                .success(function (response) {
                    if (!response.Token || !response.Token.length) {
                        messageService.publish('loginFailure', response);
                        messageService.publish('showError', 'Login Failed')
                    }
                    else {
                        messageService.publish('loginSuccess', response);
                    }
                })
                .error(function (response) {
                    messageService.publish('loginFailure', response);
                });
        };
        
        var readCookie = function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
        }

        var hasAuthenticationCookie = function(){
            return readCookie("AuthToken") != null;
        }


        var isLoggedIn = function(){
            



            var val = readCookie("AuthToken");
            $http.get("/api/authentication/" + val)
                .success(function (response) {
                    messageService.publish('isLoggedInSuccess', response);
            })
            .error(function (response) {
                    messageService.publish('isLoggedInFailure', response);
            });
        
        }
        
        

        var logout = function () {
            $http.delete("/api/authentication/")
                .success(function (response) {
                    messageService.publish('logoutSuccess', response);
                })
            .error(function (response) {
                messageService.publish('logoutFailure', response);
            });
        }

        return {
            login: login,
            isLoggedIn: isLoggedIn,
            logout: logout,
            hasAuthenticationCookie: hasAuthenticationCookie
        };
    }

    var module = angular.module("caWebApp");
    module.factory("loginService", loginService);
}())