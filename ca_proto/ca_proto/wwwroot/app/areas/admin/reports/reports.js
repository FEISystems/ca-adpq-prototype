(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, reportService) {
        var model = this;
        model.provider = {};
        model.title = "Reports";
        model.tab = 1;
        model.height = 400;
        model.width = 700;
        model.orderProducts = [];
        model.orderProductQuery = {};

        model.pieChart = function (context, height, width) {
            var chart = this;
            chart.context = context;
            chart.height = height;
            chart.width = width;
            chart.radius = Math.floor(Math.min(height, width) / 2);
            chart.centerX = Math.floor(width / 2);
            chart.centerY = Math.floor(height / 2);

            chart.fullSweep = 2.0 * Math.PI;
            chart.zero = -0.5 * Math.PI;


            chart.drawSlice = function (startPercent, sweepPercent, color) {
                chart.context.beginPath();
                chart.context.arc(chart.centerX, chart.centerY, chart.radius, chart.zero + startPercent * chart.fullSweep, chart.zero + sweepPercent * chart.fullSweep);
                chart.context.lineTo(chart.centerX, chart.centerY);
                chart.context.stroke();
                chart.context.fillStyle = color;
                chart.context.fill();
            };

            chart.clear = function () {
                chart.context.clearRect(0, 0, chart.width, chart.height);
            };

            return chart;
        };

        model.showFilter = function () {
            model.tab = 1;
        };

        model.showExpendituresByProductType = function () {
            model.tab = 2;
            var canvas = document.getElementById("productTypeCanvas");
            var context = canvas.getContext("2d");
            var pieChart = model.pieChart(context, model.height, model.width);
            pieChart.drawSlice(0, 1.0 / 3.0, "red");
            pieChart.drawSlice(1.0 / 3.0, 2.0 / 3.0, "blue");
            pieChart.drawSlice(2.0 / 3.0, 1, "green");
        };

        model.clearPie = function () {
            var canvas = document.getElementById("productTypeCanvas");
            var context = canvas.getContext("2d");
            var pieChart = model.pieChart(context, model.height, model.width);
            pieChart.clear();
        };

        model.showExpendituresByContractor = function () {
            model.tab = 3;
        };

        model.showPurchasesByAccount = function () {
            model.tab = 4;
        };

        model.showRawData = function () {
            model.tab = 5;
        };

        model.fetchOrderProducts = function () {
            reportService.fetchOrderProducts(model.orderProductQuery);
        };

        messageService.subscribe('getOrderProductsSuccess', function (response) {
            model.orderProducts = response;
        });

        messageService.subscribe('getOrderProductsFailure', function (response) {
            model.orderProducts = [];
        });

    };

    module.component("reports", {
        templateUrl: "app/areas/admin/reports/reports.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "reportService", controller]

    });
}())