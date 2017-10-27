//This script tag must be included in updateCoscpace HTML page
//UpdateCospace HTML page to contain both createspace and updateCospace script tags for localstorage logic 
// function getUrlVars() {
//     var vars = [], hash;
//     var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//     for (var i = 0; i < hashes.length; i++) {
//         hash = hashes[i].split('=');
//         vars.push(hash[0]);
//         vars[hash[0]] = hash[1];
//     }
//     return vars;
// }

$(document).ready(function () {

    $(".alertClose").on('click', function(){
        var numItems = $('.alertClose').length;
        if(numItems == 0 || numItems == 1)
          $(this).parents("#existingMembers").remove();
        // numItems=numItems-1;    
    });
    // var coSpaceCard = {};

    // myFunc = function (eleDiv) {
    //     console.log(eleDiv);
    //     coSpaceCard.id = $(eleDiv).attr("coSpaceId");
    //     coSpaceCard.name = $(eleDiv).find('#coSpaceName').attr("coSpaceName");
    //     coSpaceCard.code = $(eleDiv).find('#code').attr("code");
    //     coSpaceCard.uri = $(eleDiv).find('#uri').attr("uri");
    //     coSpaceCard.defLay = $(eleDiv).find('#defLay').attr("defLay");
    //     console.log(coSpaceCard);

    // }

    // BEGIN Update Cospace Logic
    // $("#editBtn").click(function () {
    //     $("#createSpace").hide();
    //     $("#updateSpace").show();
    //     window.location.href = "/createspace?card=" + JSON.stringify(coSpaceCard);
    //     console.log(coSpaceCard);
    // });

    // $('#btndone').click(function () {
    //     var userName = getUrlVars()["card"];
    //     console.log(userName);
    //     var reqData = {
    //         "coSpaceId": coSpaceCard.id,
    //         "name": $('#contact-sName').val(),
    //         "uri": $('#contact-create_space_URI'),
    //         "passcode": $('#contact-sPasscode').val(),
    //         "defaultLayout": $('#sel1').val(),
    //     };
    //     httpPut(apiType.UPDATE_COSCPACE, reqData, function (resp) {
    //         alert("Cospace updated successfully..!") //TODO Toaster
    //     });
    // });
    //END Update Cospace Logic


    // BEGIN POPULATE UPDATE COSPACE FORM
    var url = window.location.href;
    var subString = url.substring(url.indexOf('=') + 1);
    console.log(subString);
    httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + subString, function (resp, err) {
            $("#contact-sName").val(resp.data.coSpace.name);
            $("#contact-create_space_URI").val(resp.data.coSpace.uri);
            $("#sel1 option[value='Allequal']").prop("selected", true);
            $("#sel2 option[value='One Time']").val("selected", true);
            $("#fromdate").val("26-10-2017");
            $("#fromtime").val("26-10-2017");
            $("#todate").val("12:45");
            $("#totime").val("14:00");
        });

    // END POPULATE UPDATE COSPACE FORM

    $('#btndone').click(function () {
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
            swal("Success!", "", "success");
            setTimeout(function(){window.location.href="/spacelist"}, 2000);
            }
        }    
    });
});


