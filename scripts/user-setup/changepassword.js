$(document).ready(function(){
    $('#saveBtn').click(function(){
        debugger;
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            //To populate error texts 
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });

            if(resultItem.indexOf(false) < 0){
                // To check if new-password == confirm-password
                if($('#new-password').val() == $('#c-password').val()){
                    reqData = {
                        "userID" : parseInt(localStorage.getItem("userID")),
                        "userPassword": $('#new-password').val()
                    }
                    console.log(reqData);
                    // Put method to change the password
                    httpPut(apiType.CHANGE_PASSWORD, reqData, function(resp){
                        alert("Password successfully changed"); //To do toast
                        window.location.href = '/configure';
                    });
                }
                // Passwords mismatch new-password != confirm-password
                else {
                    toastr.options.closeButton = true;
                    toastr.info('Password Mismatch');
                }  
            }
        }
    });

});