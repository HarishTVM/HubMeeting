$(document).ready(function(){
    $('#loginBtn').click(function(){
        debugger;
        var isformvalid = false;
        var isnamevalid = false;
        var ispswdvalid = false;
        var name = $('#contact-name').val();
        var passwd = $('#contact-email').val();

        if(name == ""){
            isnamevalid = false;
        }
        else {
            isnamevalid = true;
        }
        if(passwd == ""){
            ispswdvalid = false;
        }
        else{
            ispswdvalid = true;
        }

        if(isnamevalid == true && ispswdvalid == true)
            isformvalid = true;

        if(isformvalid){
            debugger;
            httpGet('authenticateUser?userName='+name+'&userPassword='+passwd, function(response){
                debugger;
                console.log(response);
                if(response.data.isFirstTime == 1 && response.data.isApiConfigured == true && response.data.isSmtpConfigured == true) {
                    window.location.href = "/changepassword";
                }
                else if(response.data.isFirstTime == 0 && response.data.isApiConfigured == false && response.data.isSmtpConfigured == true){
                    window.location.href = "/configure";
                }
                else if(response.data.isFirstTime == 0 && response.data.isApiConfigured == true && response.data.isSmtpConfigured == false){
                    window.location.href = "/smtp";
                }
                else {
                    window.location.href = "/dashboard";
                }
                });
        }         
        else {
            alert("Please enter valid details into the from fields");
            return false;
        }
    });
});