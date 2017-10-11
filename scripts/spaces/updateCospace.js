//This script tag must be included in updateCoscpace HTML page
//UpdateCospace HTML page to contain both createspace and updateCospace script tags for localstorage logic 

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

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
   
      // BEGIN Update Cospace Logic
      $("#editBtn").click(function(){
        debugger;
        console.log(coSpaceCard);
        window.location.href="/createspace?card=" + JSON.stringify(coSpaceCard);
        
        var userName = getUrlVars()["id"];
        console.log(userName);
        
        $('#doneBtn').click(function(){
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
   
    }

 
}); 


