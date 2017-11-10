$(document).ready(function () {
    //-----BEGIN--------------------------HARISH CODE------------------------------------
    // checkWindowPathName();
    // ----END---------------------------HARISH CODE------------------------------------

    // BEGIN DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE
    
    // BEGIN OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
    var randomObj = {};
    // END OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
    
    // ---------- BEGIN MAKE A MEMBER OWNER ---------------
    $("#ownerIcon").toggle(
        function(){$(this).children().css("color","#2ed3ae");$(this).children().attr('title','Active Owner')},
        function(){$(this).children().css("color","black");$(this).children().attr('title','Deactive Owner')}
    );
    // ---------- END MAKE A MEMBER OWNER ---------------

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
            $('#sel1').append($('<option />', {
                value: i,
                text: meetingLayoutTranslation[i]
            }));
            count++;
        }
    }
    // END DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE

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

    // BEGIN THIS FUNCTION WILL CALLED BASDED ON MEETING TYPES
    checkOneTimeMeeting = function () {
        // BEGIN EXISTING SPACENAME AND URI VALIDATION
        $("#contact-sName").on("blur",function () {
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

        $("#contact-create_space_URI").on("blur", function () {
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

    // BEGIN CHECK MEETING TYPE
        $("#contact-sName").on("focus", function () {
            var checkedVal = $('input[name=types]:checked').val();
            if (checkedVal === "0") {
                debugger;
                $("#contact-sName").on("blur", function () {
                    debugger;
                    console.log(checkedVal);
                    console.log(typeof(checkedVal));
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
                                    randomObj.spaceid = getcospace.attrkey.id;
                                });
                            } 
                            else {
                                $("#spaceNameCheck").removeClass("hide").fadeIn();
                            }
                        });
                    }
                    else $("#spaceNameCheck").addClass("hide").fadeOut();
                });

                $("#contact-create_space_URI").on("blur", function () {
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
            }
            else if (checkedVal === "1") {  // IF CHECKEDVAL == 1 
                checkOneTimeMeeting();
            }
            else {
                console.log('empty')
            }
        });
    // END CHECK MEETING TYPE

    // BEGIN FORM SUBMIT LOGIC
    $("#newMeetingDone").click(function () {
        debugger;
        var startDateFormat = $("#fromdate").val().split('-');
        var startDate = startDateFormat[1] + '-' + startDateFormat[0] + '-' + startDateFormat[2];

        var fromISO = moment(startDate + ' ' + $("#fromtime").val()).toISOString();

        var endDateFormat = $("#todate").val().split('-');
        var endDate = endDateFormat[1] + '-' + endDateFormat[0] + '-' + endDateFormat[2];

        var toISO = moment(endDate + ' ' + $("#totime").val()).toISOString();
        var start = moment(fromISO).tz('Europe/London');
        var end = moment(toISO).tz('Europe/London');

        console.log(start._i);
        console.log(end._i);

        var startTz = moment.tz(fromISO, moment.tz.guess()).clone().tz('Europe/London').format();
        var endTz = moment.tz(toISO, moment.tz.guess()).clone().tz('Europe/London').format();

        console.log(startTz);
        console.log(endTz);

        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                var fromISO = moment($("#fromdate").val() + ' ' + $("#fromtime").val()).toISOString();
                var toISO = moment($("#todate").val() + ' ' + $("#totime").val()).toISOString();
                var start = moment(fromISO).tz('Europe/London');
                var end = moment(toISO).tz('Europe/London');
                if($('input[name=types]:checked').val() === "0"){
                    isCospaceId = randomObj.spaceid;
                 }
                 else if($('input[name=types]:checked').val() === "1"){
                    isCospaceId = "";
                 }
                var reqData = {
                    "coSpace": $("#contact-sName").val(),
                    "description": $("#description").val(),
                    "coSpaceId": isCospaceId,
                    "meetingStatus": 0,
                    "uri": $("#contact-create_space_URI").val(),
                    "defaultLayout": $('select[name=selectLayout]').val(),
                    "ownerJid": "",
                    "isInitiated": false,
                    "passcode": $("#passcode").val(),
                    "meetingType": parseInt($('input[name=types]:checked').val()),
                    "meetingStartDateTime": start._i,
                    "meetingEndDateTime": end._i,
                    "members": [
                        {
                            "memberJid": "Harish@inflexion.com",
                            "coSpaceUserID": "c6eeeaac-e805-43f8-b15b-cf1d1f0246b7",
                            "isOwner": true
                        },
                        {
                            "memberJid": "naveen@inflexion.com",
                            "coSpaceUserID": "bef098fd-b4e0-4b7a-811b-f6ea4441a9df",
                            "isOwner": false
                        }
                    ]
                };
                httpPost(apiType.CREATE_MEETING, reqData, function (resp, err) {
                    debugger;
                    console.log(resp);
                    console.log(err);
                    $('input[name=types]:checked').val("");
                    console.log($('input[name=types]:checked').val());
                    // var checked = $('input[name=types]:checked').val();
                    // console.log(checked);
                });
            }
            
        }
    });
    // END FORM SUBMIT LOGIC
});

//-----BEGIN--------------------------HARISH CODE------------------------------------
// checkWindowPathName = function () {

//     if (Window.path.name == "/schedulemeeting") {

//     }
// }
// ----END---------------------------HARISH CODE------------------------------------

