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
                    "uri": $('#contact-sMember').val(),
                    "passcode": $('#contact-sPasscode').val(),
                    "defaultLayout": "allEqual",
                    "cdrTag": "a123"
                };
                console.log(reqData);
                httpPost(apiType.CREATE_COSPACE, reqData, function(resp, err){
                    if(err){
                        //Error code
                    }
                    else{
                        //Success Code

                        console.log(resp);
                        //Localstorage Logic
                        localStorage.setItem("cospaceid",resp.data);
                    }
                });
            }
        }
    });

});