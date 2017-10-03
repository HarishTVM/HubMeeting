$(document).ready(function(){
    $('#loginBtn').click(function(){
        if($('form').hasClass('validate-form')){
            var resultItem = [];

            $('.validate-text').each(function(i, obj){
                console.log(obj);
                resultItem.push(validateText(obj));
            });
            if(resultItem.indexOf(false) < 0){
                httpGet(apiType.AUTH_USER+'?userName='+$('#contact-name').val()+'&userPassword='+$('#contact-email').val(), function(resp, err){
                    debugger;
                    if(err){
                        if(err.customErrCode == errorCodes.UNKNOWN_USER) // TODO Toastr
                            alert("user not exists");
                    }
                    //local storage logic
                    localStorage.setItem("userID", resp.data.userID);
                    console.log(localStorage.getItem("userID"));
                });
            }
        }
    });
});