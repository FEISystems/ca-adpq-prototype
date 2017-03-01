(function () {
    "use strict";
    var module = angular.module("caWebApp");
    
    var controller = function ($scope, $location, messageService, reportService, orderByFilter) {
        var model = this;
        model.provider = {};
        model.title = "Reports";
        model.tab = 0;
        model.height = 400;
        model.width = 750;
        model.orderProducts = [];
        model.orderProductsOnPage = [];
        model.orderProductQuery = { Start: 0, End: 0 };
        model.sortColumn = "CreateDate";
        model.sortAscending = false;
        model.responseMessage = "";
        model.pageIndex = 0;
        model.numberOfPages = 1;
        model.pageCount = 10;
        model.pageCounts = [5, 10, 25, 50];
        model.hardwareColor = "#6495ED";
        model.softwareColor = "#FF7F50";
        model.serviceColor = "#A9A9A9";
        model.accountColors = [model.hardwareColor, model.softwareColor, model.serviceColor, "Gold"];
        model.contractors = [];
        model.contractorColumnWidth = 0;
        model.paymentAccounts = [];
        model.paymentAccountColumnWidth = 0;
        model.orderStatuses = [];
        model.trendDatePadding = 100;
        model.moneyAxisPadding = 100;
        model.grandTotal = 0;
        model.expendituresOverTime = [];

        (model.pieChart = function (context, height, width, centerXOffset) {
            if (!context) return;
            var chart = {};
            chart.context = context;
            chart.height = height;
            chart.width = width;
            chart.radius = Math.floor(Math.min(chart.height, chart.width) / 2);
            chart.centerX = Math.floor(chart.width / 2) + centerXOffset;
            chart.centerY = Math.floor(chart.height / 2);

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

            return chart;
        })();

        model.setExpendituresOrder = function (columnName) {
            model.setOrder(columnName);
            model.showExpendituresOverTime();
        };

        model.setOrder = function (columnName) {
            if (columnName == model.sortColumn)
                model.sortAscending = !model.sortAscending;
            else {
                model.sortColumn = columnName;
                model.pageIndex = 0;
            }
            model.refreshTable();
        };

        model.showDashboard = function () {
            model.tab = 0;
        };

        model.showFilter = function () {
            model.tab = 1;
        };

        model.noProducts = function () {
            if (!model.orderProducts || model.orderProducts.length == 0) {
                model.handleError("No report data has been retrieved.\r\nTry running the report with a different Data Filter.");
                return true;
            }
            return false;
        };

        model.showExpendituresOverTime = function () {
            if (model.noProducts()) return;
            model.tab = 7;
            model.grandTotal = 0;
            var total = 0;
            var filtered = model.getFilteredProducts();
            for (var i = 0; i < filtered.length; i++) {
                total += filtered[i].Total;                
            }
            model.grandTotal = total;
            model.expendituresOverTime = filtered;
        };

        model.getFilteredProducts = function () {
            if (!model.orderProductQuery.OrderStatus || model.orderProductQuery.OrderStatus.len == 0) {
                //if no order status is chosen to filter then return all rows
                return model.orderProducts;
            }
            var result = [];
            for (var i = 0; i < model.orderProducts.length; i++) {
                var row = model.orderProducts[i];
                if (model.orderProductQuery.OrderStatus.includes(row.Status))
                    result.push(row);
            }
            return result;
        };

        model.drawExpendituresByProductType = function (tab, canvasName, includeLabels) {
            var canvas = document.getElementById(canvasName);
            var context = model.initContext(tab, canvas);
            if (null == context) return;
            var total = 0.0;
            var hardwareTotal = 0;
            var softwareTotal = 0;
            var serviceTotal = 0;
            var filtered = model.getFilteredProducts();
            for (var i = 0; i < filtered.length; i++) {
                var row = filtered[i];
                total += row.Total;
                if (filtered[i].ProductType == "Hardware")
                    hardwareTotal += row.Total;
                else if (filtered[i].ProductType == "Software")
                    softwareTotal += row.Total;
                else if (filtered[i].ProductType == "Service")
                    serviceTotal += row.Total;
            }
            
            var xOffset = 0;
            if (!includeLabels)
                xOffset = -50;
            var pieChart = model.pieChart(context, canvas.height, canvas.width, xOffset);
            pieChart.drawSlice(0.0, hardwareTotal / total, model.hardwareColor);// "#6495ED");
            pieChart.drawSlice(hardwareTotal / total, (hardwareTotal + softwareTotal) / total, model.softwareColor);// "#FF7F50");
            pieChart.drawSlice((hardwareTotal + softwareTotal) / total, 1.0, model.serviceColor);// "#A9A9A9");
            model.drawLabels(context, canvas.width - 100);

            if (!includeLabels)
                return;
            var totalLabels = [];
            totalLabels.push({ color: model.hardwareColor, text: model.toMoney(hardwareTotal) });
            totalLabels.push({ color: model.softwareColor, text: model.toMoney(softwareTotal) });
            totalLabels.push({ color: model.serviceColor, text: model.toMoney(serviceTotal) });
            model.drawCustomLabels(context, 10, 20, totalLabels);
        };


        model.showExpendituresByProductType = function () {
            model.drawExpendituresByProductType(2, "productTypeCanvas", true);
        };

        model.toMoney = function (number) {
            return "$" + number.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            });
        };

        model.drawLabels = function (context, left) {
            context.fillStyle = "White";
            for (var i = 0; i < 3; i++) {
                context.fillRect(left - 3, 17 + i*20, 100, 16)
            }
            model.drawCustomLabels(context, left, 20,
                [
                    { color: model.hardwareColor, text: "Hardware" },
                    { color: model.softwareColor, text: "Software" },
                    { color: model.serviceColor, text: "Service" }
                ]);
        };

        model.drawCustomLabels = function (context, left, top, labels) {
            context.font = "16px Verdana";
            for (var i = 0; i < labels.length; i++)
                model.drawLabel(context, left, top + (i * 20), labels[i].color, labels[i].text);
        };

        model.drawLabel = function (context, left, top, color, text) {
            context.fillStyle = color;
            context.fillRect(left, top, 10, 10)
            context.fillStyle = "Black";
            context.fillText(text, left + 15, top + 10);
        };

        model.drawExpendituresByContractor = function (tab, canvasName, includeLabels) {
            var canvas = document.getElementById(canvasName);
            var context = model.initContext(tab, canvas);
            if (null == context) return;
            model.contractors = [];
            model.contractorColumnWidth = 0;
            var contractors = model.extractContractors();
            if (!contractors || contractors.length == 0)
                return;
            model.contractors = contractors;
            model.contractorColumnWidth = Math.floor(canvas.width / model.contractors.length);
            var totals = model.initializeTotals(contractors.length);
            model.calculateTotals(totals, contractors, "Contractor");
            var max = model.normalizeTotals(totals);
            model.drawTotals(context, totals, canvas.width, canvas.height);
            if (includeLabels) {
                model.drawMoneyLines(context, max);
            }
            model.drawLabels(context, canvas.width - 100);
        };

        model.showExpendituresByContractor = function () {
            model.drawExpendituresByContractor(3, "contractorCanvas", true);
        };

        model.drawTotals = function (context, totals, width, height) {
            //draw the data
            var padding = 20 * (totals.length + 1);
            var usableWidth = width - padding;
            var columnWidth = Math.floor(usableWidth / totals.length / 3) - 2;
            var left = 22;
            for (var i = 0; i < totals.length; i++) {
                var values = totals[i];
                var barHeight = Math.floor(height * values.hardwareTotal);
                model.drawBar(context, left, height - barHeight, columnWidth, barHeight, model.hardwareColor);

                left += columnWidth + 2;
                barHeight = Math.floor(height * values.softwareTotal);
                model.drawBar(context, left, height - barHeight, columnWidth, barHeight, model.softwareColor);

                left += columnWidth + 2;
                var barHeight = Math.floor(height * values.serviceTotal);
                model.drawBar(context, left, height - barHeight, columnWidth, barHeight, model.serviceColor);

                left += columnWidth + 2 + 20;
            }

        };

        model.findMaxInTotals = function (totals) {
            var max = Math.max(totals[0].hardwareTotal, totals[0].softwareTotal, totals[0].serviceTotal);
            for (var i = 1; i < totals.length; i++) {
                var temp = Math.max(totals[i].hardwareTotal, totals[i].softwareTotal, totals[i].serviceTotal);
                if (temp > max)
                    max = temp;
            }
            return model.normalizeMax(max);
        };

        model.normalizeTotals = function (totals) {
            var max = model.findMaxInTotals(totals);
            for (var i = 0; i < totals.length; i++) {
                totals[i].hardwareTotal /= max;
                totals[i].softwareTotal /= max;
                totals[i].serviceTotal /= max;
            }
            return max;
        };

        model.drawBar = function (context, x, y, width, height, color) {
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        };

        model.initializeTotals = function (count) {
            var totals = [];
            for (var i = 0; i < count; i++) {
                var values = { hardwareTotal: 0.0, softwareTotal: 0.0, serviceTotal: 0.0 };
                totals.push(values);
            }
            return totals;
        };

        model.extractContractors = function () {
            var result = [];
            for (var i = 0; i < model.orderProducts.length; i++) {
                if (!result.includes(model.orderProducts[i].Contractor)) {
                    result.push(model.orderProducts[i].Contractor);
                }
            }
            return result;
        };

        model.initContext = function (canvasTab, canvas) {
            if (model.noProducts()) return null;
            model.tab = canvasTab;
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            return context;
        };

        model.drawDataTrends = function (tab, canvasName, includeLabels) {
            var canvas = document.getElementById(canvasName);
            var context = model.initContext(tab, canvas);
            if (null == context) return;
            model.paymentAccounts = [];
            var accounts = model.extractAccounts();
            if (!accounts || accounts.length == 0)
                return;
            accounts = orderByFilter(accounts, "length", false);
            model.paymentAccounts = accounts;
            window.setTimeout(function () {
                model.finalizeTrends(tab, canvasName, includeLabels);
            }, 100);
        };

        model.showPurchaseTrends = function () {
            model.drawDataTrends(6, "purchaseTrendsCanvas", true);
        };

        model.finalizeTrends = function (tab, canvasName, includeLabels) {
            var xPadding = 0;
            if (includeLabels)
                xPadding = model.moneyAxisPadding;
            var canvas = document.getElementById(canvasName);
            var context = model.initContext(tab, canvas);
            if (null == context) return;
            var accounts = model.paymentAccounts;
            context.clearRect(0, 0, canvas.width, canvas.height);
            var trends = model.initTrends(accounts);
            model.fillTrendData(trends);
            var maxTotal = model.findMaxTotalInTrends(trends);
            var labels = model.getAccountLabels(accounts);
            var height = canvas.height;
            //this canvas taller than the others for drawing the labels - need to give the ui a chance to expand before drawing labels
            if (includeLabels) {
                height = model.height;
            }
            for (var i = 0; i < trends.length; i++) {
                model.drawTrend(context, trends[i], maxTotal, labels[i].color, canvas.width, height, xPadding);
            }
            if (!includeLabels)
                return;
            model.drawMoneyLines(context, maxTotal);
            model.drawCustomLabels(context, 20, model.height + model.trendDatePadding, labels);
            var dateLabels = model.getDateLabels();
            for (var i = 0; i < dateLabels.length; i++) {
                model.drawDateLabel(context, dateLabels[i].x, 0, dateLabels[i].text);
            }
        };

        //only used for expanded chart, so model height and width are fine
        model.drawMoneyLines = function (context, max) {
            context.font = "16px Verdana";
            context.fillStyle = "Black";
            context.strokeStyle = "#D0D0D0";
            var dollarLevels = model.getDollarLevels(max);
            for (var i = 0; i < dollarLevels.length; i++) {
                var y = model.calculateTrendY(model.height, dollarLevels[i], max);
                if (y > 10) {
                    context.beginPath();
                    context.moveTo(0, y);
                    context.lineTo(model.width + model.moneyAxisPadding, y);
                    context.stroke();
                }
                if (dollarLevels[i] == 0)
                    continue;
                context.fillText(model.toMoney(dollarLevels[i]), 5, y + 15);
            }
        };

        model.getDateLabels = function () {
            var start = new Date(model.orderProductQuery.Start);
            var days = Math.round((new Date(model.orderProductQuery.End) - start) / 86400000);
            var sections = 10;
            var daysPerSection = days / sections;
            if (daysPerSection < 1) {
                daysPerSection = 1;
                sections = days;
            }
            var result = [];
            result.push({x:0,text: start.toLocaleDateString()});
            var widthPerSection = model.width / sections;
            var startDay = start.getDate();
            for (var i = 1; i < sections; i++) {
                var date = new Date(start);
                date = new Date(date.setDate(startDay + Math.round(i * daysPerSection)));
                result.push({x: Math.round( i*widthPerSection),text: date.toLocaleDateString()});
            }
            result.push({ x: model.width, text: new Date(model.orderProductQuery.End).toLocaleDateString() });
            return result;
        };

        model.drawDateLabel = function (context, x, y, text) {
            context.font = "16px Verdana";
            context.fillStyle = "Black";
            context.save();
            context.translate(x + model.moneyAxisPadding, model.height + y);
            context.rotate(-Math.PI / 2);
            context.textAlign = "right";
            context.fillText(text, 0, 0);
            context.restore();
        };

        model.getDollarLevels = function (max) {
            var result = [];
            var temp = max / 5;
            for (var i = 0; i < 6; i++)
                result.push(Math.round(temp * i))
            return result;
        };

        model.drawTrend = function (context, trend, maxTotal, color, width, height, xPadding) {
            if (trend.points.length == 0)
                return;
            var coordinates = [];
            for (var i = 0; i < trend.points.length; i++) {
                var point = trend.points[i];
                var x = model.calculateTrendX(width - xPadding, point.date) + xPadding;
                var y = model.calculateTrendY(height, point.total, maxTotal);
                coordinates.push({ x: x, y: y });
            }
            context.beginPath();
            if (coordinates.length == 1) {
                context.fillStyle = color;
                context.arc(coordinates[0].x, coordinates[0].y, 3, 0, 2 * Math.PI);
                context.fill();
                return;
            }
            context.strokeStyle = color;
            context.moveTo(coordinates[0].x, coordinates[0].y);
            for (var i = 0; i < coordinates.length; i++) {
                context.lineTo(coordinates[i].x, coordinates[i].y);
                context.stroke();
            }
        };

        model.calculateTrendX = function (width, date) {
            var min = new Date(model.orderProductQuery.Start).setHours(0, 0, 0, 0);
            var max = reportService.getEndOfDay(new Date(model.orderProductQuery.End));
            var range = max - min;
            var delta = date - min;
            var percent = delta / range;
            return width * percent;
        };

        model.calculateTrendY = function (height, value, max) {
            var percent = value / max;
            //use model.height - 10 as the multiplier to pad the top by 10 pixels
            return Math.floor(height - ((height - 10) * percent));
        };

        model.findMaxTotalInTrends = function (trends) {
            if (!trends)
                return 0.0;
            var max = 0.0;
            for (var i = 0; i < trends.length; i++) {
                var temp = model.findMaxTotalInTrend(trends[i]);
                if (temp > max)
                    max = temp;
            }
            return model.normalizeMax(max);
        };

        model.normalizeMax = function (max) {
            var orderOfMagnitude = 10;
            while (max > orderOfMagnitude) {
                orderOfMagnitude *= 10;
            }
            orderOfMagnitude /= 100;
            var temp = orderOfMagnitude;
            while (temp < max) {
                temp += orderOfMagnitude;
            }
            return temp;
        };

        model.findMaxTotalInTrend = function (trend) {
            if (!trend.points)
                return 0;
            var max = 0.0;
            for (var i = 0; i < trend.points.length; i++) {
                if (trend.points[i].total > max)
                    max = trend.points[i].total;
            }
            return max;
        };

        model.fillTrendData = function (trends) {
            var filtered = model.getFilteredProducts();
            var products = orderByFilter(filtered, "CreateDate", false);
            for (var i = 0; i < filtered.length; i++) {
                var row = filtered[i];
                var date = new Date(row.CreateDate).setHours(0, 0, 0, 0);
                var trend = model.findTrend(trends, row.PaymentMethod)
                var dataPoint = model.findDataPoint(trend, date);
                dataPoint.total += row.Total;
            }
        };

        model.findDataPoint = function (trend, date) {
            for (var i = 0; i < trend.points.length; i++) {
                if (trend.points[i].date == date) {
                    return trend.points[i];
                }
            }
            var result = { date: date, total: 0.0 };
            trend.points.push(result);
            return result;
        };

        model.findTrend = function (trends, name) {
            for (var i = 0; i < trends.length; i++) {
                if (trends[i].name == name)
                    return trends[i];
            }
            return null;
        };

        model.initTrends = function (accounts) {
            var result = [];
            for (var i = 0; i < accounts.length; i++) {
                result.push({name: accounts[i], points:[]})
            }
            return result;
        };

        model.getAccountLabels = function (accounts) {
            var result = [];
            for (var i = 0; i < accounts.length; i++) {
                if (i < 4)
                    result.push({ color: model.accountColors[i], text: accounts[i] });
                else
                    result.push({ color: "Black", text: accounts[i] });//this should never happen
            }
            return result;
        };

        model.drawPurchasesByAccount = function (tab, canvasName, includeLabels) {
            var canvas = document.getElementById(canvasName);
            var context = model.initContext(tab, canvas);
            if (null == context) return;
            model.paymentAccounts = [];
            model.paymentAccountColumnWidth = 0;
            var accounts = model.extractAccounts();
            if (!accounts || accounts.length == 0)
                return;
            model.paymentAccounts = accounts;
            model.paymentAccountColumnWidth = Math.floor(model.width / model.paymentAccounts.length);
            var totals = model.initializeTotals(accounts.length);
            model.calculateTotals(totals, accounts, "PaymentMethod");
            var max = model.normalizeTotals(totals);
            model.drawTotals(context, totals, canvas.width, canvas.height);
            if (includeLabels) {
                model.drawMoneyLines(context, max);
            }
            model.drawLabels(context, canvas.width - 100);
        };

        model.showPurchasesByAccount = function () {
            model.drawPurchasesByAccount(4, "purchasesCanvas", true);
        };

        model.calculateTotals = function (totals, list, key) {
            var filtered = model.getFilteredProducts();
            for (var i = 0; i < filtered.length; i++) {
                var row = filtered[i];
                var keyIndex = list.indexOf(row[key]);
                var values = totals[keyIndex];
                if (row.ProductType == "Hardware")
                    values.hardwareTotal += row.Total;
                else if (row.ProductType == "Software")
                    values.softwareTotal += row.Total;
                else if (row.ProductType == "Service")
                    values.serviceTotal += row.Total;
            }
        }

        model.extractAccounts = function () {
            var result = [];
            for (var i = 0; i < model.orderProducts.length; i++) {
                if (!result.includes(model.orderProducts[i].PaymentMethod)) {
                    result.push(model.orderProducts[i].PaymentMethod);
                }
            }
            return result;
        };

        model.showRawData = function () {
            if (model.noProducts()) return;
            model.tab = 5;
        };

        model.fetchOrderProducts = function () {
            model.clearDashboard();
            model.orderProducts = [];
            model.expendituresOverTime = [];
            var start = new Date(model.orderProductQuery.Start);
            if (start > Date.now()) {
                model.handleError("The Data Filter Start Date cannot be in the future.");
                return;
            }
            var end = new Date(model.orderProductQuery.End);
            if (start > end) {
                model.handleError("The Data Filter Start Date cannot be after the End Date.")
                return;
            }
            reportService.fetchOrderProducts(model.orderProductQuery);
        };

        model.handleError = function (error) {
            //model.tab = 8;
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

        model.initDateRange = function () {
            var start = new Date(Date.now());
            var year = start.getFullYear();
            var month = start.getMonth();
            if (month < 3)
                month = 0;
            else if (month < 6)
                month = 3;
            else if (month < 9)
                month = 6;
            else
                month = 9;
            start = new Date(year, month, 1);
            var end = new Date(new Date(year, month + 3, 0, 0, 0, 0, 0));
            model.orderProductQuery = { Start: start.toLocaleDateString(), End: end.toLocaleDateString() };
        };

        model.downloadCsv = function () {
            reportService.downloadCsv(model.orderProductQuery);
        };

        model.clearDashboard = function () {
            var dashboardCanvases = ["productTypeCanvasDashboard", "contractorCanvasDashboard", "purchaseTrendsCanvasDashboard"];
            for (var i = 0; i < dashboardCanvases.length; i++) {
                var canvas = document.getElementById(dashboardCanvases[i]);
                var context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        model.drawDashboard = function () {
            model.clearDashboard();
            model.drawDataTrends(0, "purchaseTrendsCanvasDashboard", false);
            model.drawExpendituresByProductType(0, "productTypeCanvasDashboard", false);
            model.drawExpendituresByContractor(0, "contractorCanvasDashboard", false);
            model.drawPurchasesByAccount(0, "purchasesCanvasDashboard", false);
        };

        model.showAllCharts = function() {
            model.drawDataTrends(10, "purchaseTrendsCanvas", true);
            model.drawExpendituresByProductType(10, "productTypeCanvas", true);
            model.drawExpendituresByContractor(10, "contractorCanvas", true);
            model.drawPurchasesByAccount(10, "purchasesCanvas", true);
        };

        messageService.subscribe('getOrderProductsSuccess', function (response) {
            model.orderProducts = response;
            model.refreshTable();
            model.drawDashboard();
            model.responseMessage = "Found " + response.length + " matching records";
        });

        messageService.subscribe('getOrderProductsFailure', function (response) {
            model.orderProducts = [];
            model.handleError(response);
        });

        messageService.subscribe('retrievedOrderStatusSimple', function(response) {
            model.orderStatuses = response;
        });

        messageService.subscribe('retrievedOrderStatusSimpleFail', function (response) {
            model.orderStatuses = [];
        });

        model.initDateRange();
        reportService.fetchOrderStatuses();
    };

    module.component("reports", {
        templateUrl: "app/areas/admin/reports/reports.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "reportService", "orderByFilter", controller]

    });
}())