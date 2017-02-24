(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, reportService, orderByFilter) {
        var model = this;
        model.provider = {};
        model.title = "Reports";
        model.tab = 1;
        model.height = 400;
        model.width = 700;
        model.orderProducts = [];
        model.orderProductsOnPage = [];
        var start = new Date();
        var end = new Date();
        start.setMonth(start.getMonth() -3);
        model.orderProductQuery = { Start: start.toLocaleDateString(), End: end.toLocaleDateString() };
        model.sortColumn = "CreateDate";
        model.sortAscending = true;
        model.responseMessage = "";
        model.pageIndex = 0;
        model.numberOfPages = 1;
        model.pageCount = 10;
        model.pageCounts = [5, 10, 25, 50];
        model.hardwareColor = "#6495ED";
        model.softwareColor = "#FF7F50";
        model.serviceColor = "#A9A9A9";

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
            chart.context.strokeStyle = "Black";

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

        model.setOrder = function(columnName) {
            if (columnName == model.sortColumn)
                model.sortAscending = !model.sortAscending;
            else {
                model.sortColumn = columnName;
                model.pageIndex = 0;
            }
            model.refreshTable();
        }

        model.showFilter = function () {
            model.tab = 1;
        };

        model.showExpendituresByProductType = function () {
            model.tab = 2;
            var canvas = document.getElementById("productTypeCanvas");
            var context = canvas.getContext("2d");

            var total = 0.0;
            var hardwareTotal = 0;
            var softwareTotal = 0;
            var serviceTotal = 0;
            for (var i = 0; i < model.orderProducts.length; i++) {
                var row = model.orderProducts[i];
                total += row.Total;
                if (model.orderProducts[i].ProductType == "Hardware")
                    hardwareTotal += row.Total;
                else if (model.orderProducts[i].ProductType == "Software")
                    softwareTotal += row.Total;
                else if (model.orderProducts[i].ProductType == "Service")
                    serviceTotal += row.Total;
            }
            var pieChart = model.pieChart(context, model.height, model.width);
            pieChart.drawSlice(0.0, hardwareTotal / total, model.hardwareColor);// "#6495ED");
            pieChart.drawSlice(hardwareTotal / total, (hardwareTotal + softwareTotal) / total, model.softwareColor);// "#FF7F50");
            pieChart.drawSlice((hardwareTotal + softwareTotal) / total, 1.0, model.serviceColor);// "#A9A9A9");
            model.drawLabels(context);
        };

        model.drawLabels = function (context) {
            var top = 20;
            var left = model.width - 100;
            context.font = "16px Verdana";
            context.fillStyle = model.hardwareColor;// "#6495ED";
            context.fillRect(left, top, 10, 10)
            context.fillStyle = "Black";
            context.fillText("Hardware", left + 15, top + 10);

            top += 20;
            context.fillStyle = model.softwareColor;// "#FF7F50";
            context.fillRect(left, top, 10, 10)
            context.fillStyle = "Black";
            context.fillText("Software", left + 15, top + 10);

            top += 20;
            context.fillStyle = model.serviceColor;// "#A9A9A9";
            context.fillRect(left, top, 10, 10)
            context.fillStyle = "Black";
            context.fillText("Service", left + 15, top + 10);
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

        model.handleError = function (error) {
            model.tab = 6;
            if (error && error.toLowerCase().indexOf("<html", 0) >= 0) {
                //try to find the error message returned from the server
                try {
                    var parser = new DOMParser();
                    var dom = parser.parseFromString(error, "text/html");
                    var titleError = dom.getElementsByClassName("titleerror");
                    if (titleError) {
                        titleError = titleError.item(0);
                        if (titleError)
                            error = titleError.innerText;
                    }
                }
                catch (x) { }
            }
            model.responseMessage = error;
        };

        model.refreshTable = function () {
            model.orderProducts = orderByFilter(model.orderProducts, model.sortColumn, model.sortAscending);
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
            model.orderProductsOnPage = [];
            model.numberOfPages = Math.floor(model.orderProducts.length / model.pageCount) + 1;
            var start = model.pageIndex * model.pageCount;
            for (var i = 0; i < model.pageCount; i++) {
                var index = start + i;
                if (index >= model.orderProducts.length)
                    break;
                model.orderProductsOnPage.push(model.orderProducts[index]);
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

        messageService.subscribe('getOrderProductsSuccess', function (response) {
            model.orderProducts = response;
            model.refreshTable();
            model.responseMessage = "Found " + response.length + " matching records";
        });

        messageService.subscribe('getOrderProductsFailure', function (response) {
            model.orderProducts = [];
            model.handleError(response);
        });

    };

    module.component("reports", {
        templateUrl: "app/areas/admin/reports/reports.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "reportService", "orderByFilter", controller]

    });
}())