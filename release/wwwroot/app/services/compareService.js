(function () {
    var compareService = function (messageService, $http, $sessionStorage, $rootScope, growl) {

        var compareProducts = [];

        var getCompareProduct = function (id, scopeId, length, index) {
            var lengthCount = length;
            $http.get("/api/inventory/" + id)
                .success(function (response) {

                    compareProducts.push(response);
                    if (index === length) {
                        var response = {};
                        response.compareProducts = compareProducts;
                        response.scopeId = scopeId;
                        response.lengthCount = lengthCount;
                        messageService.publish('refreshCompareListSuccess', response);
                        compareProducts = [];
                    }
                })
                .error(function (response) {
                    messageService.publish('getCompareProductFailure', response);
                });
        };

        var refreshCompareList = function (scopeId) {
            compareProducts = [];

            var scopeId = scopeId;

            if ($sessionStorage.compareList) {
                var itemIds = $sessionStorage.compareList;
                if (itemIds.length > 0) {
                    for (var i = 0; i < itemIds.length; ++i) {
                        var idx = 1 + i;
                        var itemId = itemIds[i];
                        getCompareProduct(itemId, scopeId, itemIds.length, idx);
                    }

                } else {
                    messageService.publish('refreshCompareListSuccess');
                }



            } else {
                var errorMsg = "There are no compare items to gets.";
                messageService.publish('refreshCompareListFailure', errorMsg);
            }
        }

        var addCompareItem = function (newItem, scopeId) {
            var items = [];

            if (newItem) {

                if (!$sessionStorage.compareList) {
                    $sessionStorage.compareList = [];
                }

                $sessionStorage.compareList.push(newItem)
                messageService.publish('addCompareItemSucess');
                growl.success("<strong>Your item has been added to the Compare List.</strong>");

            } else {
                var errorMsg = "Item could not be added to Compare List.";
                messageService.publish('addNewItemFailure', errorMsg);
            }


        };


        var removeCompareItem = function (itemId, scopeId) {
            if (itemId && $sessionStorage.compareList) {

                $sessionStorage.compareList = jQuery.grep($sessionStorage.compareList, function (value) {
                    return value != itemId;
                });

                $rootScope.$broadcast("updateCheckboxes");
                growl.warning("<strong>Your item has been removed from the Compare List.</strong>");
                $rootScope.$broadcast("removeCompareItemSuccess", scopeId);

            } else {
                var errorMsg = "Item could not be removed from Compare List.";
                messageService.publish('removeCompareItemFailure', errorMsg);
            }
        };


        var clearAllCompareItems = function () {
            var items = [];

            if ($sessionStorage.compareList) {

                delete $sessionStorage.compareList;
                refreshCompareList();
                growl.warning("<strong>Your items has been cleared from the Compare List.</strong>");

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