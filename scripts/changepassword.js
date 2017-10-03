$(document).ready(function(){
    $('#saveBtn').click(function(){
        debugger;
        console.log(userid);
        if($('form').hasClass('validate-form')){
            var resultItem = [];

            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });

            if(resultItem.indexOf(false) < 0){
                debugger;
                if($('#new-password').val() == $('#c-password').val()){
                    reqData = {
                        "userID" : parseInt(userid),
                        "userPassword": $('#new-password').val()
                    }
                    console.log(reqData);
                    httpPut(apiType.CHANGE_PASSWORD, reqData, function(resp){
                        console.log(resp);
                        alert("Password successfully changed");
                        window.location.href = '/configure';
                    });
                }
                else {
                    toastr.options.closeButton = true;
                    toastr.info('Password Mismatch');
                }  
            }
        }
    });

});