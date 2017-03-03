(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, loginService) {
        var model = this;
        model.provider = {};
        model.title = "Admin Login";
        model.loginAdminClick = function ()
        {
            loginService.login("Admin1", "@dMin1");
        };
        model.loginConsumerClick = function () {
            loginService.login("Consumer1", "C0nSumer1");
        };

        model.isLoggedInClick = function () {
            loginService.isLoggedIn();
        }
        model.logOutClick = function () {
            loginService.logout();
        }

        messageService.subscribe('loginSuccess', function (response) {
            alert('Log In Success');
        })

        messageService.subscribe('loginFailure', function (response) {
            alert('Log In Failure');
        })

        messageService.subscribe('isLoggedInSuccess', function (response) {
            alert("Are you logged in : " + response);
        })

        messageService.subscribe('isLoggedInFailure', function (response) {
            debugger;
        })
    };

    module.component("adminLogin", {
        templateUrl: "app/areas/admin/login/login.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "loginService", controller]

    });
}())