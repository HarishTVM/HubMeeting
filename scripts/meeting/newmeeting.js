$(document).ready(function () {
<<<<<<< HEAD

    checkWindowPathName();

=======
>>>>>>> 534d19fbe1267939409b88bf69995ad2b96d51ac
    // BEGIN DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE
    var count = 0;
    var i;

    for (i in meetingType) {
        if (meetingType.hasOwnProperty(i)) {
            // console.log(i);
            $("#typeMeeting").append(
                $('<label />', {
                    'text': i
                }).prepend(
                    $('<input />', {
                        type: 'radio',
                        name: 'types',
                        id: 'types' + meetingType[i],
                        value: meetingType[i]
                    })
                    )
            );
            count++;
        }
    }

    for (i in meetingLayoutTranslation) {
        if (meetingLayoutTranslation.hasOwnProperty(i)) {
            $('#sel1').append($('<option>', {
                value: meetingLayoutTranslation.i,
                text: meetingLayoutTranslation[i]
            }));
            count++;
        }
    }
    // END DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE

    //BEGIN CHECK FOR MEETING TYPE
    checkMeetingType();
    //END CHECK FOR MEETING TYPE

    // BEGIN CHECK IF OWNERJID FIELD ID FILLED
    checkOwnerJid = function () {
        var preventPropagate = true;
        $("#clickToAdd").on("click", function (e) {
            debugger;
            if ($("#ownerJid").val() == "") {
                if (preventPropagate) {
                    e.stopPropagation();
                    swal('Please fill ownerJid field...');
                }
            }
            else {
                preventPropagate = false;
            }
        });
    };
    // END CHECK IF OWNERJID FIELD ID FILLED

    // BEGIN FORM SUBMIT LOGIC
    $("#newMeetingDone").click(function () {
        debugger;
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                // var fromDateTime = moment($("#fromdate").val() + ' ' + $("#fromtime").val());
                // var toDateTime = moment($("#todate").val() + ' ' + $("#totime").val());
                var reqData = {
                    "meetingType": $('input[name=types]:checked').val(),
                    "coSpace": $("#contact-sName").val(),
                    "description": $("#description").val(),
                    "uri": $("#contact-create_space_URI").val(),
                    "passcode": $("#passcode").val(),
                    "defaultLayout": $("#sel1").val(),
                    "ownerJid": $("#ownerJid").val(),
                    // "meetingStartDateTime": fromDateTime,
                    // "meetingEndDateTime": toDateTime,
                    "members":[
                        {
                            "memberJid":"Harish@inflexion.com",
                            "coSpaceUserID":"c6eeeaac-e805-43f8-b15b-cf1d1f0246b7",
                            "isOwner": true
                        },
                        {
                            "memberJid":"naveen@inflexion.com",
                            "coSpaceUserID":"bef098fd-b4e0-4b7a-811b-f6ea4441a9df",
                            "isOwner": false
                        }
                    ],
                    "coSpaceId":"e0fa5c21-0bee-41c7-903e-6092460b05b2",
                    "meetingStatus":0,
                    "isInitiated":false,
                    "meetingStartDateTime":"2017-11-06T07:25:33.229Z",
                    "meetingEndDateTime":"2017-11-06T07:25:33.229Z",
                };
                debugger;
                httpPost(apiType.CREATE_MEETING, reqData, function (resp, err) {
                    debugger;
                    console.log(resp);
                    console.log(err);
                });
                $('input[name=types]:checked').val("");
                checkedVal = $('input[name=types]:checked').val();
                console.log(checkedVal);
            }
        }
    });
    // END FORM SUBMIT LOGIC
});

checkWindowPathName = function(){

    if(Window.path.name == "/schedulemeeting"){
        
    }
}

// BEGIN THIS FUNCTION WILL CALLED BASDED ON MEETING TYPES
checkOneTimeMeeting = function () {
    console.log($('input[name=types]:checked').val());
    // BEGIN EXISTING SPACENAME AND URI VALIDATION
    $("#contact-sName").blur(function () {
        debugger;
        var checkcoSpaceName = $(this).val();
        if (checkcoSpaceName != "") {
            httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
                if (resp.data.coSpaces.attrkey.total == 1) {
                    $("#spaceNameCheck").addClass("hide").fadeOut();
                    swal('Space Name already exists...');
                }
                else $("#spaceNameCheck").removeClass("hide").fadeIn();
            });
        }
        else $("#spaceNameCheck").addClass("hide").fadeOut();
    });

    $("#contact-create_space_URI").blur(function () {
        debugger;
        var checkcoSpaceUri = $(this).val();
        if (checkcoSpaceUri != "") {
            httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceUri, function (resp, err) {
                if (resp.data.coSpaces.attrkey.total == 1) {
                    $("#spaceUriCheck").addClass("hide").fadeOut();
                    swal('URI already exists...');
                }
                else $("#spaceUriCheck").removeClass("hide").fadeIn();
            });
        }
        else {
            debugger;
            $("#spaceUriCheck").addClass("hide").fadeOut();
        }
    });
    // END EXISTING SPACENAME AND URI VALIDATION

    // BEGIN CALL CHECKOWNERJID FUNCTION 
    checkOwnerJid();
    // END CALL CHECKOWNERJID FUNCTION 
}
// END THIS FUNCTION WILL CALLED BASDED ON MEETING TYPES

var checkedVal;
// BEGIN CHECK MEETING TYPE
checkMeetingType = function () {
    $("#contact-sName").on("focus", function () {
        // var inputs = $("#typeMeeting").find("input");
        var checkedVal = $('input[name=types]:checked').val();
        console.log(checkedVal)
        if (checkedVal == 0) {
            debugger;
            $("#contact-sName").blur(function () {
                if ($("#contact-sName").val() != "") {
                    var checkcoSpaceName = $(this).val();
                    httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
                        if (resp.data.coSpaces.attrkey.total == 1) {
                            $("#spaceNameCheck").addClass("hide").fadeOut();
                            // swal('Space Name already exists...');
                            var cospace = resp.data.coSpaces.coSpace.attrkey.id;
                            httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + cospace, function (cospace_resp, err) {
                                var getcospace = cospace_resp.data.coSpace;
                                $("#contact-create_space_URI").val(getcospace.uri);
                                $("#passcode").val(getcospace.passcode);
                                $("#ownerJid").val(getcospace.ownerJid);
                            });
                        }
                        else {
                            $("#spaceNameCheck").removeClass("hide").fadeIn();
                        }
                    });

                    // BEGIN WHEN ADD MEMBER BUTTON IS CLICKED, OWNER HAS TO BE PRE_POPULDATED
                    $("#clickToAdd").one("click", function () {
                        debugger;
                        if ($("#ownerJid").val() != "") {
                            var ownerVal = $("#ownerJid").val();
                            var owner = $('<input id="owner" name="owner" class="form-input" type="text" value="ownerVal"/>\
                            <span id="" class="fa fa-2x fa-user" aria-hidden="true" title="Owner"></span>\
                            ');
                            $('#memberParentDiv').append(owner);
                        }
                        else {
                            checkOwnerJid();
                        }
                    });
                    // END WHEN ADD MEMBER BUTTON IS CLICKED, OWNER HAS TO BE PRE_POPULDATED
                }
                else $("#spaceNameCheck").addClass("hide").fadeOut();
            });
        }
        else if(checkedVal == 1){  // IF CHECKEDVAL == 1 
            checkOneTimeMeeting();
        }
        else {
            console.log('empty')
        }
    });
}
// END CHECK MEETING TYPE

