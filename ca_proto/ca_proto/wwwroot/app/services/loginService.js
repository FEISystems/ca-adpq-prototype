(function() {
    
    var loginService = function (messageService, $http, $sessionStorage, $rootScope) {
        
        var login = function (username, password) {


            var creds = {username: username, password: password };


            $http.post("/api/authentication", creds)
                .success(function (response) {
                    if (!response.Token || !response.Token.length) {
                        messageService.publish('loginFailure', response);
                        messageService.publish('showError', 'Login Failed')
                    }
                    else {
                        if (response.IsAdmin == true) {
                            delete $sessionStorage.user;
                            delete $sessionStorage.userName;
                            $sessionStorage.user = "Admin";
                            $sessionStorage.userName = response.UserName;
                        }
                        else {
                            delete $sessionStorage.user;
                            delete $sessionStorage.userName;
                            $sessionStorage.user = "Authorized User";
                            $sessionStorage.userName = response.UserName;
                        }
                        messageService.publish('loginSuccess', response);
                    }
                    $rootScope.$broadcast("userLoggedIn");
                })
                .error(function (response) {
                    messageService.publish('loginFailure', response);
                    $rootScope.$broadcast("userLoggedIn");
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
            var z = unescape(val);
            var userName = z.substring(z.indexOf("|") + 1);
            $http.get("/api/authentication/" + val)
                .success(function (response) {
                    if (response === "False")
                        messageService.publish('isLoggedInFailure', response);
                    else
                        messageService.publish('isLoggedInSuccess', { response: response, userName: userName });
                    return true;
            })
            .error(function (response) {
                    messageService.publish('isLoggedInFailure', response);
                    return false;
            });
        
        }

        var logout = function () {
            $http.delete("/api/authentication/")
                .success(function (response) {
                    messageService.publish('logoutSuccess', response);
                    delete $sessionStorage.user;
                    delete $sessionStorage.userName;
                    $rootScope.$broadcast("userLoggedOut");
                })
            .error(function (response) {
                messageService.publish('logoutFailure', response);
                delete $sessionStorage.user;
                delete $sessionStorage.userName;
                $rootScope.$broadcast("userLoggedOut");
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