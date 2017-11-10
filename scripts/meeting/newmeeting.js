$(document).ready(function () {
    var isKeyEntered = false;
    var userObj;
    // BEGIN CREATE ARRAY OF MEMBERS
    var memArrayList = [];
    var ownerArrayList = [];
    //-----BEGIN--------------------------HARISH CODE------------------------------------
    // checkWindowPathName();
    // ----END---------------------------HARISH CODE------------------------------------

    // BEGIN OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
    var randomObj = {};
    // END OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING

    //BEGIN Mirror populate input value logic
    $('#contact-sName').on('keyup', function () {
        $('#contact-create_space_URI').val(this.value);
        $('videoAdd').append(this.value);
    });
    //END Mirror populate input value logic

    // ---------- BEGIN MAKE A MEMBER OWNER ---------------
    var isOwner = false;
    $("#ownerIcon").live("click", function () {
        $(this).toggle(function () {
            $(this).children().css("color", "#2ed3ae");
            $(this).children().attr('title', 'Active Owner');
            isOwner = true;
            $(this).attr("ifOwner", isOwner);
            console.log(isOwner);
        }, function () {
            $(this).children().css("color", "black");
            $(this).children().attr('title', 'Deactive Owner');
            isOwner = false;
            $(this).attr("ifOwner", isOwner);
            console.log(isOwner);
        }).trigger('click');
    });
    // ---------- END MAKE A MEMBER OWNER ---------------

    //BEGIN Add Member and DELETE MEMBER Logic
    $('#addMemberBtn').live('click', function () {
        var member = $('<div id="addDeleteParent" class="input-group form-wrap input-box-shadow">\
                            <input name="addMembers" id="addMembers" class="form-input" type="email" list="emails" autocomplete="off" multiple placeholder="add member...">\
                            <span name="ownerspan" id="ownerIcon" ifOwner="" class="bg-gray input-group-addon"><a class="fa fa-user-circle fa-lg" aria-hidden="true" title="Owner"></a></span>\
                            <span id="deleteMember" class="input-group-addon"><a class="minus-icon fa fa-trash-o fa-lg" aria-hidden="true"></a></span>\
                            </div>\
                            <datalist id="emails">\
                            <option id="memberAddDiv"></option>\
                            </datalist>');

        $('#memberParentDiv').append(member);
    });

    $("#deleteMember").live('click', function () {
        $(this).parent().remove();
    });

    //END Add Member and DELETE MEMBER Logic

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
        $("#contact-sName").on("blur", function () {
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
                console.log(typeof (checkedVal));
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


    $("#submitMembersBtn").click(function () {
        debugger;
        $("input[name='addMembers']").each(function () {
            debugger;
            memArrayList.push($(this).val());
        });
        console.log(memArrayList);
        $("[name='ownerspan']").each(function () {
            ownerArrayList.push($(this).attr("ifOwner"));
        });
        console.log(ownerArrayList);

    });
    // END CREATE ARRAY OF MEMBERS

    // BEGIN GET USERS
    $('#addMembers').live("keyup", function () {
        if (!isKeyEntered) {
            isKeyEntered = true;
            var that = this;
            setTimeout(function () {
                debugger;
                var filterData = $(that).val();
                httpGet(apiType.GET_USERS + "?filter=" + filterData, function (resp) {
                    debugger;
                    var totalUsers = resp.data.total;
                    var memberHandlebar = $('#memberAdd').html();
                    var templateHandlebar = Handlebars.compile(memberHandlebar);
                    $('#memberAddDiv').html(templateHandlebar(resp.data));
                    isKeyEntered = false;
                });
            }, 1000);
        }
    });
    // END GET USERS

    // BEGIN TO GET COSPACE_USER_ID
        $("#memberAddDiv").on('select',function(){
            debugger;
            console.log($(this).val());
        });
    // END TO GET COSPACE_USER_ID

    // BEGIN FORM SUBMIT LOGIC
    $("#newMeetingDone").click(function () {
        debugger;
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                var fromISO = moment($("#fromdate").val() + ' ' + $("#fromtime").val()).toISOString();
                var toISO = moment($("#todate").val() + ' ' + $("#totime").val()).toISOString();
                var start = moment(fromISO).tz('Europe/London');
                console.log(start);
                var end = moment(toISO).tz('Europe/London');
                console.log(end);
                if ($('input[name=types]:checked').val() === "0") {
                    isCospaceId = randomObj.spaceid;
                }
                else if ($('input[name=types]:checked').val() === "1") {
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

