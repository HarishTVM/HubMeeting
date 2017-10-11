//This script tag must be included in updateCoscpace HTML page
//UpdateCospace HTML page to contain both createspace and updateCospace script tags for localstorage logic 
$(document).ready(function(){

    var coSpaceCard = {};

        myFunc = function(eleDiv){
        debugger;
        console.log(eleDiv);
        coSpaceCard.id = $(eleDiv).attr("coSpaceId");
        coSpaceCard.name = $(eleDiv).find('#coSpaceName').attr("coSpaceName");
        coSpaceCard.code = $(eleDiv).find('#code').attr("code");
        coSpaceCard.uri = $(eleDiv).find('#uri').attr("uri");
        coSpaceCard.defLay = $(eleDiv).find('#defLay').attr("defLay");
        console.log(coSpaceCard);
    }



    //BEGIN Update Cospace Logic
    $("#editBtn").click(function(){
        window.location.href="/createspace";
        $('#contact-sName').val() = coSpaceCard.name;
        $('#contact-create_space_URI').val() = coSpaceCard.uri;
        $('#contact-sPasscode').val() = coSpaceCard.code;
        $('#sel1').val() = coSpaceCard.defLay;

        $('#updateBtn').click(function(){
            var reqData = {
                "coSpaceId": coSpaceCard.id,
                "name": $('#contact-sName').val(),
                "uri": $('#contact-create_space_URI'),
                "passcode": $('#contact-sPasscode').val(),
                "defaultLayout": $('#sel1').val(),
            };
            httpPut(apiType.UPDATE_COSCPACE, reqData, function(resp){
                alert("Cospace updated successfully..!") //TODO Toaster
            });
        });
    })
    //END Update Cospace Logic
}); 


