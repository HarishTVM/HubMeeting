$(document).ready(function(){
    $('#btndone').click(function(){
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });

            if(resultItem.indexOf(false) < 0){
                var reqData = {
                    "name": $('#contact-sName').val(),
                    "uri": $('#contact-create_space_URI').val(),
                    "passcode": $('#contact-sPasscode').val(),
                    "defaultLayout": $('#sel1').val(),
                };
                console.log(reqData);
                httpPost(apiType.CREATE_COSPACE, reqData, function(resp, err){
                    if(err){
                        if(err.customErrCode == errorCodes.BAD_REQUEST) {
                            toastr.options.closeButton = true;
                            toastr.error("Error: DuplicateCoSpaceUri");
                          }
                    }
                    else{
                        console.log(resp);
                        //Success Toast service
                        toastr.options.closeButton = true;
                        toastr.success("Cospace created successfully..!");
                        setTimeout(function(){window.location.href="/spacelist"}, 5000); 
                    }
                });
            }
        }
    });

});