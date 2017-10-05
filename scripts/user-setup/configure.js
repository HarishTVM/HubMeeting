$(document).ready(function(){
    $('#configureBtn').click(function(){
        debugger;
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
                        if(err.customErrCode == errorCodes.API_UNKNOWN_USER) // TODO Toastr
                        {
                          toastr.options.closeButton = true;
                          toastr.error(err.message);
                        }
                        var errIntServData = "Error: Error: connect ECONNREFUSED 192.168.5.29:445";
                        if(err.data === errIntServData){
                            toastr.options.closeButton = true;
                            toastr.warning(err.data);
                        }  
                    }
                    // Toast for successful API configuration - TODO
                    else {
                        console.log(resp);
                        alert("API configured succesfully"); //Demo only
                    }
                });
            }
        }
    });
});