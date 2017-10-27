$(document).ready(function(){
    // BEGIN AUTOPOPULATE FORM FOR CONFIGURE AND SMTP PAGES
    if(window.location.pathname == "/configure-settings"){
        $("#api-url").val("https://192.168.5.27:445");
        $("#api-uname").val("apiuser");
        $("#api-password").val("apipassword");
    }
    else if(window.location.pathname == "/smtp-settings"){
        $("#serveraddress").val("mail.inflexion.com");
        $("#username").val("inflexionuser");
        $("#password").val("inflexionpassword");
        $("#tlsport").val(465);
        $("#sslport").val(443);
    }
    else if(window.location.pathname == "/configure"){
        $("#api-url").val("");
        $("#api-uname").val("");
        $("#api-password").val("");
    }
    // END AUTOPOPULATE FORM FOR CONFIGURE AND SMTP PAGES

});