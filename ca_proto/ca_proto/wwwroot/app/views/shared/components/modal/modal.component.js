(function() {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function(messageService, $http, loginService) {
        var model = this;
        model.showModal = false;//!loginService.hasAuthenticationCookie();

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
    };

    module.component('modal', {
        templateUrl: 'app/views/shared/components/modal/modal.component.html',
        controllerAs: 'model',
        controller : ['messageService', '$http', 'loginService', controller]
    });

}())