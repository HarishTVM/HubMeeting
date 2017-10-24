$(document).ready(function(){
    $('#configureBtn').click(function(){
        $("#page-loader").show();
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });

            if(resultItem.indexOf(false) < 0){
                var reqData = {
                    "apiUrl": $('#api-url').val(),
                    "apiUserName": $('#api-uname').val(),
                    "apiPassword": $('#api-password').val()
                }
                httpPost(apiType.CONFIGURE, reqData, function(resp, err){
                    debugger;
                    if(err){
                        //Error for unknown user
                        if(err.customErrCode == errorCodes.API_UNKNOWN_USER)
                        {
                          toastr.options.closeButton = true;
                          toastr.error(err.message);
                        }
                    }
                    // Toast for successful API configuration - TODO
                    else {
                        console.log(resp);
                        toastr.options.closeButton = true;
                        toastr.info("Success. Page will be re-directed to Dashboard");
                        setTimeout(function(){window.location.href="/dashboard"}, 5000);
                    }
                });
            }
        }
    });
});