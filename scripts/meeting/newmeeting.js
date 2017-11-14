$(document).ready(function () {
    // BEGIN ---------------------GLOBAL VARIABLES---------------------
    var isKeyEntered = false;
    var isOwner = false

    // BEGIN CREATE ARRAY OF MEMBERS 
    var memArrayList = [], memArray = [];
    var ownerArrayList = [], ownerArr = [];
    var cospaceUSerIdArray = [], coUserArr = [];
    var newArray = [];
    var memberObj = [],finalArray=[];
    var uniques = [];
    // BEGIN CREATE ARRAY OF MEMBERS

    // END ---------------------GLOBAL VARIABLES---------------------

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
    $("#ownerIcon").live("click", function () {
        $(this).toggle(function () {
            $(this).children().css("color", "#2ed3ae");
            $(this).children().attr('title', 'Active Owner');
            isOwner = true;
            $(this).attr("ifOwner", isOwner);
        }, function () {
            $(this).children().css("color", "black");
            $(this).children().attr('title', 'Deactive Owner');
            isOwner = false;
            $(this).attr("ifOwner", isOwner);
        }).trigger('click');
    });
    // ---------- END MAKE A MEMBER OWNER ---------------

    // BEGIN -----------------ONLY ONE MEMBER CAN BE OWNER LOGIC-----------------


    // END -----------------ONLY ONE MEMBER CAN BE OWNER LOGIC-----------------

    //BEGIN Add Member and DELETE MEMBER Logic
    $('#addMemberBtn').live('click', function () {
        var member = $('<div id="addDeleteParent" class="input-group form-wrap input-box-shadow">\
                            <input name="addMembers" id="addMembers" class="form-input" type="email" list="emails" autocomplete="off" multiple placeholder="add member...">\
                            <span name="ownerspan" id="ownerIcon" ifOwner="false" class="bg-gray input-group-addon"><a class="fa fa-user-circle fa-lg" aria-hidden="true" title="Owner"></a></span>\
                            <span id="deleteMember" class="input-group-addon"><a class="minus-icon fa fa-trash-o fa-lg" aria-hidden="true"></a></span>\
                            </div>\
                            <datalist id="emails">\
                            <option id="memberAddDiv"></option>\
                            </datalist>');

        $('#memberParentDiv').append(member);
    });

    $("#deleteMember").live('click', function () {
        if ($(this).parents("#memberParentDiv").children('div').length == 1) {
            $(this).prop('disabled', true);
        }
        else {
            $(this).parent().remove();
        }
    });

    //END Add Member and DELETE MEMBER Logic

    // BEGIN DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE
    var count = 0;
    var i;
    for (i in meetingType) {
        if (meetingType.hasOwnProperty(i)) {
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
            $("#contact-sName").on("blur", function () {
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

    // BEGIN FILTER FOR COSPACE_USER_ID

    $("#addMembers").live("blur", function () {
        httpGet(apiType.GET_USERS + "?filter=" + $(this).val(), function (resp, err) {
            var userCospaceId = resp.data.users[0].user.attrkey.id;
            cospaceUSerIdArray.push(userCospaceId);
        });
    });

    // END FILTER FOR COSPACE_USER_ID

    avoidDuplicate = function(array){
        var uniqueNames = [];
        $.each(array, function (i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        return uniqueNames;
    }

    // Array.prototype.contains = function(v) {
    //     for(var i = 0; i < this.length; i++) {
    //         if(this[i] === v) return true;
    //     }
    //     return false;
    // };
    
    // Array.prototype.unique = function() {
    //     var arr = [];
    //     for(var i = 0; i < this.length; i++) {
    //         if(!arr.contains(this[i])) {
    //             arr.push(this[i]);
    //         }
    //     }
    //     return arr; 
    // }

    // BEGIN COMBINE ARRAYS INTO ARRAY OF OBJECTS
    $("#submitMembersBtn").click(function () {
        // uniques=[];
        memberObj=[];
        debugger;
        $("input[name='addMembers']").each(function () {
            memArrayList.push($(this).val());
            memArray = avoidDuplicate(memArrayList);
        });

        $("[name='ownerspan']").each(function () {
            ownerArrayList.push($(this).attr("ifOwner"));
        });

        newArray = memArray.map(function (value, index) {
            return value + ':' + ownerArrayList[index] + ':' + cospaceUSerIdArray[index];
        });

        var sampleArray = [];
        for (i = 0; i < newArray.length; i++) {
            sampleArray = newArray[i].split(':');

            var member1 = {
                "memberJid": sampleArray[0],
                "isOwner": sampleArray[1],
                "coSpaceUserID": sampleArray[2]
            }
            memberObj.push(member1);
            // uniques = memberObj.unique(); 
        }
        console.log(memberObj);
        // console.log("uniques:" +  JSON.stringify(uniques));
    });
  
    
    // END COMBINE ARRAYS INTO ARRAY OF OBJECTS

    // BEGIN GET USERS
    $('#addMembers').live("keyup", function () {
        if (!isKeyEntered) {
            isKeyEntered = true;
            var that = this;
            setTimeout(function () {
                var filterData = $(that).val();
                httpGet(apiType.GET_USERS + "?filter=" + filterData, function (resp) {
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

        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                var startDateFormat = $("#fromdate").val().split('-');
                var startDate = startDateFormat[1] + '-' + startDateFormat[0] + '-' + startDateFormat[2];
                var fromISO = moment(startDate + ' ' + $("#fromtime").val()).toISOString();
                var endDateFormat = $("#todate").val().split('-');
                var endDate = endDateFormat[1] + '-' + endDateFormat[0] + '-' + endDateFormat[2];
                var toISO = moment(endDate + ' ' + $("#totime").val()).toISOString();
                var start = moment(fromISO).tz('Europe/London');
                var end = moment(toISO).tz('Europe/London');

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
                    "members": memberObj
                };
                httpPost(apiType.CREATE_MEETING, reqData, function (resp, err) {
                    $('input[name=types]:checked').val("");
                    console.log(resp);
                    console.log(err);
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

