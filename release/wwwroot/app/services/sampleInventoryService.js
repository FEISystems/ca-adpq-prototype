 (function () {

    var sampleInventoryService = function ($resource) {       

        var getInventory = function () {            
            return $resource('js/sampleData/inventory.json',{ }, {
                    get: {method:'GET', isArray: true}
                });
        }

        var getProduct = function () {            
            return $resource('js/sampleData/inventory.json',{ }, {
                    get: {method:'GET', isArray: true}
                });
        }


        return {
            getInventory: getInventory,
            getProduct : getProduct
        };
    };

    var module = angular.module("caWebApp");
    module.factory("sampleInventoryService", sampleInventoryService);
}());