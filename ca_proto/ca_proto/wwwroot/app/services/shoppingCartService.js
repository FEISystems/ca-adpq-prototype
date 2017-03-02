(function () {

    var shoppingCartService = function (messageService, $http, growl, loginService) {
        var model = this;

        model.shoppingCart = {};
        model.shoppingCart.UserId = 0;
        model.shoppingCart.CreateDate = "";
        model.shoppingCart.Status = 1,
            model.shoppingCart.Total = "";
        model.shoppingCart.Items = []

        model.latestCart = null;


        var addProductToCart = function (product, id) {
            if (!loginService.hasAuthenticationCookie())
                return null;
            $http.post("/api/ShoppingCart/AddItem", product)
                .success(function (response) {
                    response.sourceId = id;
                    messageService.publish('addProductToCartSuccess', response);
                    model.latestCart = response;
                    growl.success("<strong>Your item has been added to the Cart.</strong>");
                })
                .error(function (response) {
                    response.sourceId = id;
                    messageService.publish('addProductToCartFailure', response);
                });
        };

        var getActiveCart = function (sourceId) {
            if (!loginService.hasAuthenticationCookie())
                return null;

            $http.get("/api/ShoppingCart/GetActive")
                .success(function (response) {
                    response.sourceId = sourceId;
                    model.latestCart = response;
                    messageService.publish('getActiveCartSuccess', response);
                })
                .error(function (response) {
                    response.sourceId = sourceId;
                    messageService.publish('getActiveCartFailure', response);
                });
        };

        var getCheckOutCart = function (product) {
            if (!loginService.hasAuthenticationCookie())
                return null;
            $http.get("/api/ShoppingCart/GetActive")
                .success(function (response) {
                    model.latestCart = response;
                    messageService.publish('getCheckOutCartSuccess', response);
                })
                .error(function (response) {
                    messageService.publish('getCheckOutCartFailure', response);
                });
        };

        var updateCart = function (product) {
            if (!loginService.hasAuthenticationCookie())
                return null;
            $http.put("/api/ShoppingCart/UpdateItem", product)
                .success(function (response) {
                    messageService.publish('updateCartSuccess', response);
                    model.latestCart = response;
                    growl.success("<strong>Your cart has been updated.</strong>");
                })
                .error(function (response) {
                    messageService.publish('updateCartFailure', response);
                });
        };

        var removeCartItem = function (itemId) {
            if (!loginService.hasAuthenticationCookie())
                return null;
            $http.delete("/api/ShoppingCart/RemovedItem/" + itemId)
                .success(function (response) {
                    messageService.publish('removeCartItemSuccess', response);
                    model.latestCart = response;
                    growl.warning("<strong>Your item has been removed from the Cart.</strong>");
                })
                .error(function (response) {
                    messageService.publish('removeCartItemFailure', response);
                });
        };

        var getLastestCart = function () {
            return model.latestCart;
        }


        return {
            addProductToCart: addProductToCart,
            getActiveCart: getActiveCart,
            updateCart: updateCart,
            removeCartItem: removeCartItem,
            getCheckOutCart: getCheckOutCart,
            getLastestCart: getLastestCart
        };
    }

    var module = angular.module("caWebApp");
    module.factory("shoppingCartService", shoppingCartService);
}())