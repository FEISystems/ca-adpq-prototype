(function () {
    var compareService = function (messageService, $http, $sessionStorage, $rootScope) {



        var getCompareProduct = function (id) {
            $http.get("/api/inventory/" + id)
                .success(function (response) {
                    messageService.publish('getCompareProductSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getCompareProductFailure', response);
                });
        };

        messageService.subscribe('getCompareProductSuccess', function (response) {
            $rootScope.compareProducts.push(response);
        })

        var refreshCompareList = function () {
            $rootScope.$broadcast("clearCompareItems", []);
            $rootScope.compareProducts = [];
            if ($sessionStorage.compareList) {
                var itemIds = $sessionStorage.compareList;

                for (var i in itemIds) {
                    var itemId = itemIds[i];
                    getCompareProduct(itemId)
                }

                messageService.publish('refreshCompareListSuccess');

            } else {
                var errorMsg = "There are no compare items to gets.";
                messageService.publish('refreshCompareListFailure', errorMsg);
            }
        };

        var addCompareItem = function (newItem) {
            var items = [];

            if (newItem) {

                if (!$sessionStorage.compareList) {
                    $sessionStorage.compareList = [];
                }
                if (!$sessionStorage.compareProducts) {
                    $sessionStorage.compareProducts = [];
                }
                $sessionStorage.compareList.push(newItem)
                refreshCompareList();

            } else {
                var errorMsg = "Item could not be added to Compare List.";
                messageService.publish('addNewItemFailure', errorMsg);
            }


        };


        var removeCompareItem = function (itemId) {
            if (itemId && $sessionStorage.compareList) {

                $sessionStorage.compareList = jQuery.grep($sessionStorage.compareList, function (value) {
                    return value != itemId;
                });

                $rootScope.$broadcast("updateCheckboxes");
                refreshCompareList();

            } else {
                var errorMsg = "Item could not be removed from Compare List.";
                messageService.publish('removeCompareItemFailure', errorMsg);
            }
        };


        var clearAllCompareItems = function (itemId) {
            var items = [];

            if ($sessionStorage.compareList) {

                delete $sessionStorage.compareList;
                refreshCompareList();

            } else {
                var errorMsg = "Item could not be removed from Compare List.";
                messageService.publish('removeCompareItemFailure', errorMsg);
            }
        };


        return {
            refreshCompareList: refreshCompareList,
            addCompareItem: addCompareItem,
            removeCompareItem: removeCompareItem,
            clearAllCompareItems: clearAllCompareItems
        };
    }

    var module = angular.module("caWebApp");
    module.factory("compareService", compareService);
}())