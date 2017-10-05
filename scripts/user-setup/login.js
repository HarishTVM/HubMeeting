$(document).ready(function(){
    $('#loginBtn').click(function(){
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });
            if(resultItem.indexOf(false) < 0){
                httpGet(apiType.AUTH_USER+'?userName='+$('#contact-name').val()+'&userPassword='+$('#contact-email').val(), function(resp, err){  
                    if(err){
                        if(err.customErrCode == errorCodes.UNKNOWN_USER) // TODO Toastr
                        {
                          toastr.options.closeButton = true;
                          toastr.error('User does not exist');
                        }  
                    }
                    //local storage logic
                    localStorage.setItem("userID", resp.data.userID);
                    curUserID = localStorage.getItem("userID");
                    if(curUserID == 1 && resp.data.isApiConfigured == true){
                        // If both password is changed and API is configured
                        window.location.href="/dashboard";
                    }
                    else if(curUserID == 0 && (resp.data.isApiConfigured == false || resp.data.isApiConfigured == true))
                        // if password is not changed
                        window.location.href = '/changepassword';
                    
                    else if(curUserID == 1 && resp.data.isApiConfigured == false)
                        // If change password is done but API is not configured 
                        window.location.href = '/configure';
                
                    else if(curUserID == 1 && resp.data.isApiConfigured == true && resp.data.isSmtpConfigured == false){
                        // Toast gives info about smtp configuration
                        toastr.options.closeButton = true;
                        toastr.error('SMTP is not configured. Visit settings --> smtp to configure SMTP');
                        // After smtp related info is displayed, go to dashboard page
                        // SMTP configuration is not mandatory, but recommended
                        window.location.href="/dashboard";
                    }
                });
            }

        }
    }); 
});