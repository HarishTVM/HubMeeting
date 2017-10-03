var userid;
$(document).ready(function(){
    $('#loginBtn').click(function(){
        debugger;
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
                    console.log(localStorage.getItem("userID"));
                    curUserID = localStorage.getItem("userID");
                    if(curUserID == 1){
                        window.location.href="/dashboard";
                    }
                    else{
                        window.location.href = '/changepassword';
                    }
                });
            }

        }
    }); 
});

// Making userID available for change password page
userid = localStorage.getItem("userID");
console.log(userid);  