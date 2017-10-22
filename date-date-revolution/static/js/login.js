$(document).ready(function() {
    function login() {
        FB.login(function(response){
            console.log(response);
            if(response.status != 'connected') FB.login;
            else {
                console.log("YES");
                id = response.authResponse.accessToken;
                $.get('https://graph.facebook.com/me?access_token='+id+'&fields=id,name,email,picture', function(response) {
                    console.log(response);
                });

                window.location.replace('/ddr');
            }
        });
    }
    $("#login-btn").on("click", login);
});