//This script tage must be included in updateCoscpace HTML page
//UpdateCospace HTML page to contain both createspace and updateCospace script tags for localstorage logic 
$(document).ready(function(){
    //BEGIN Update Cospace Logic
    $('#updateBtn').click(function(){
       if($('form').hasClass('validate-form')){
           var resultItem = [];
           $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
           });

           if(resultItem.indexOf(false) < 0){
            var reqData = {
                "coSpaceId": localStorage.getItem("cospaceid"),
                "name": $('#contact-sName').val(),
                "uri": $('#contact-sMember').val(),
                "passcode": $('#contact-sPasscode').val(),
                "defaultLayout": "allEqual",
                "cdrTag": "a123"
            };
            httpPut(apiType.UPDATE_COSCPACE, reqData, function(resp){
                alert("Cospace updated successfully..!") //TODO Toaster
            });
           }
       }
    });
    //END Update Cospace Logic

    //BEGIN DELETE COSPACE USER LOGIC
    $('#deleteBtn').click(function(){
        httpDelete(apiType.DELETE_COSPACE_USER+"?cospaceId=localStorage.getItem('cospaceid')", function(resp){
            console.log(resp);
            alert("User deletion successfull..!") //TODO Toaster
        })
    });
    //END DELETE COSPACE USER LOGIC
});