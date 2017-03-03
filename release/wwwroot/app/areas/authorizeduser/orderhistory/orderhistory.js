(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, orderService, orderByFilter) {
        var model = this;
        model.title = "Order History";
        model.orderStatuses = [];
        model.paymentMethods = [];
        model.sortColumn = "CreateDate";
        model.sortAscending = false;
        model.pageIndex = 0;
        model.numberOfPages = 1;
        model.pageCount = 10;
        model.pageCounts = [5, 10, 25, 50];
        model.orders = [];
        model.ordersOnPage = [];

        model.setOrder = function (columnName) {
            if (columnName == model.sortColumn)
                model.sortAscending = !model.sortAscending;
            else {
                model.sortColumn = columnName;
                model.pageIndex = 0;
            }
            model.refreshTable();
        };

        model.refreshTable = function () {
            model.orders = orderByFilter(model.orders, model.sortColumn, model.sortAscending);
            model.loadPage();
        };

        model.setPage = function (newPage) {
            if (!newPage || newPage < 0)
                newPage = 0;
            if (newPage > model.numberOfPages - 1)
                newPage = model.numberOfPages - 1;
            model.pageIndex = newPage;
            model.refreshTable();
        };

        model.loadPage = function () {
            model.ordersOnPage = [];
            model.numberOfPages = Math.ceil(model.orders.length / model.pageCount);
            var start = model.pageIndex * model.pageCount;
            for (var i = 0; i < model.pageCount; i++) {
                var index = start + i;
                if (index >= model.orders.length)
                    break;
                model.ordersOnPage.push(model.orders[index]);
            }
        };

        model.firstPage = function () {
            model.setPage(0);
        };

        model.priorPage = function () {
            model.setPage(model.pageIndex - 1);
        };

        model.nextPage = function () {
            model.setPage(model.pageIndex + 1);
        };

        model.lastPage = function () {
            model.setPage(model.numberOfPages);
        };


        orderService.getOrdersByUserId();
        orderService.fetchOrderStatuses();
        orderService.fetchPaymentMethods();

        model.findStatus = function (statusId) {
            for (var i = 0; i < model.orderStatuses.length; i++) {
                if (model.orderStatuses[i].Id == statusId )
                    return model.orderStatuses[i].Description;
            }
            return statusId;
        };

        model.findPaymentMethod = function (paymentMethodId) {
            for (var i = 0; i < model.paymentMethods.length; i++) {
                if (model.paymentMethods[i].Id == paymentMethodId)
                    return model.paymentMethods[i].Description;
            }
            return paymentMethodId;
        }

        messageService.subscribe("getOrdersByUserIdSuccess", function (response) {
            model.orders = response;
            for (var i = 0; i < response.length; i++) {
                response[i].Status = model.findStatus(response[i].Status);
                response[i].PaymentMethod = model.findPaymentMethod(response[i].PaymentMethod);                
            }
            model.refreshTable();
        })
        messageService.subscribe("getOrdersByUserIdFailure", function (response) {
            model.orders = [];
        })

        messageService.subscribe("fetchOrderStatusSuccess", function (response) {
            model.orderStatuses = response;
        })
        messageService.subscribe("fetchOrderStatusFailure", function (response) {
            model.orderStatuses = [];
        })
        
        messageService.subscribe("fetchPaymentMethodsSuccess", function(response) {
            model.paymentMethods = response;
        })
        messageService.subscribe("fetchPaymentMethodsFailure", function(response) {
            model.paymentMethods = [];
        })


    };

    module.component("orderHistory", {
        templateUrl: "app/areas/authorizeduser/orderhistory/orderhistory.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "orderService", "orderByFilter", controller]

    });
}())