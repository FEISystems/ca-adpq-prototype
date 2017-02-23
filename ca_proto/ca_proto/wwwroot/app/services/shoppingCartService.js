(function () {

    var shoppingCartService = function (messageService, $http) {
        var model = this;

        model.shoppingCart = {};
        model.shoppingCart.UserId = 0;
        model.shoppingCart.CreateDate = "";
        model.shoppingCart.Status = 1,
        model.shoppingCart.Total = "";
        model.shoppingCart.Items = []
        



        var addProductToCart = function (product) {
            $http.post("/api/ShoppingCart/AddItem", product)
                .success(function (response) {
                    messageService.publish('addProductToCartSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('addProductToCartFailure', response);
                });
        };

        var getActiveCart = function (product) {
            $http.get("/api/ShoppingCart/GetActive")
                .success(function (response) {
                    messageService.publish('getActiveCartSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getActiveCartFailure', response);
                });
        };

    
        var updateCart = function (product) {
            $http.put("/api/ShoppingCart/UpdateItem", product)
                .success(function (response) {
                    messageService.publish('updateCartSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('updateCartFailure', response);
                });
        };
        
        var removeCartItem = function (itemId) {
            $http.delete("/api/ShoppingCart/RemovedItem/" + itemId)
                .success(function (response) {
                    messageService.publish('removeCartItemSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('removeCartItemFailure', response);
                });
        };
        

        return {
            addProductToCart : addProductToCart,
            getActiveCart : getActiveCart,
            updateCart : updateCart,
            removeCartItem : removeCartItem
        };
    }

    var module = angular.module("caWebApp");
    module.factory("shoppingCartService", shoppingCartService);
}())