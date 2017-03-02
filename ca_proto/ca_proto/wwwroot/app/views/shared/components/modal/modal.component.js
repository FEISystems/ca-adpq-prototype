(function() {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function(messageService, $http, loginService) {
        var model = this;
        model.showModal = !loginService.hasAuthenticationCookie();

        model.loginInfo = {
            username: null,
            password: null
        };


        model.okClick = function() {
            model.loading = true;
            loginService.login(model.loginInfo.username, model.loginInfo.password);
        }

        messageService.subscribe('loginSuccess', function (response) {
            model.showModal = false;
        })
        messageService.subscribe('logoutSuccess', function (response) {
            model.showModal = true;
        })
        document.getElementById("Password")
            .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById("loginBtn").click();
            }
        });
        document.getElementById("username")
            .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById("loginBtn").click();
            }
        });
        
    };

    module.component('modal', {
        templateUrl: 'app/views/shared/components/modal/modal.component.html',
        controllerAs: 'model',
        controller : ['messageService', '$http', 'loginService', controller]
    });

}())