// Write your Javascript code.

//Hijacking
window.hijack = {
    login: function (username, password) {
        $.ajax({
            type: "POST",
            url: '/api/authentication',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                 "username": username, "password": password 
            }),
            success: function (result) {
                console.log(result);
            }
        });
    },
    isLoggedIn: function () {

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        var val = readCookie("AuthToken");
        $.ajax({
            data: {token: val},
            url: '/api/authentication',
            success: function (result) {
                console.log(result);
            }
        });

    },
    createUser: function (username, password) {
        $.ajax({
            type: "POST",
            url: '/api/authentication',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                username: username, password: password
            }),
            success: function (result) {
                console.log(result);
            }
        });
    }

};

/*

*/