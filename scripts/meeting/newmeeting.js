// BEGIN ---------------------GLOBAL VARIABLES---------------------
var isKeyEntered = false, isEntered = false;
var isOwner = false
var func;
var isCospaceId = "", iscospacename = "";
// BEGIN CREATE ARRAY OF MEMBERS 
var memArrayList = [], memArray = [];
var ownerArrayList = [], ownerArr = [];
var cospaceUSerIdArray = [], coUserArr = [];
var newArray = [];
var memberObj = [], memberNewObj = [];
// BEGIN CREATE ARRAY OF MEMBERS

// BEGIN OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
var randomObj = {};
// END OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
// END ---------------------GLOBAL VARIABLES---------------------

$(document).ready(function () {
    // Begin show datalist for spacename entries
    $("#Name").hide();
    // End show datalist for spacename entries

    //BEGIN Mirror populate input value logic
    $('#contact-sName').on('keyup', function () {
        $('#contact-create_space_URI').val(this.value);
        $('videoAdd').append(this.value);
    });
    $('#cospace-name').on('keyup', function () {
        $('#contact-create_space_URI').val(this.value);
        $('videoAdd').append(this.value);
    });
    //END Mirror populate input value logic

    // Begin cospacename of datalist type to get users
    $("#cospace-name").keyup(function () {
        if (!isEntered) {
            var that = this;
            if ($(that).val() != "") {
                isEntered = true;
                $("#nm-page-loader").removeClass("hide");
                setTimeout(function () {
                    var filterData = $(that).val();
                    httpGet(apiType.GET_COSPACES + "?filter=" + filterData, function (resp, err) {
                        var totalUsers = resp.data.total;
                        if (totalUsers >= 1) {
                            var cospaceValue = resp.data.coSpaces[0].coSpace;
                            var memberHandlebar = $('#getuser').html();
                            var templateHandlebar = Handlebars.compile(memberHandlebar);
                            $('#spacename').html(templateHandlebar(resp.data));
                            $("#contact-create_space_URI").val(cospaceValue.uri);
                            $("#passcode").val(cospaceValue.passcode);
                            // BEGIN DEFAULT LAYOUT AUTO-POPULATION
                            if (cospaceValue.defaultLayout == "allEqual")
                                $("#sel1 option[value=0]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "speakerOnly")
                                $("#sel1 option[value=1]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "telepresence")
                                $("#sel1 option[value=2]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "stacked")
                                $("#sel1 option[value=3]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "allEqualQuarters")
                                $("#sel1 option[value=4]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "allEqualNinths")
                                $("#sel1 option[value=5]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "allEqualSixteenths")
                                $("#sel1 option[value=6]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "allEqualTwentyFifths")
                                $("#sel1 option[value=7]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "onePlusFive")
                                $("#sel1 option[value=8]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "onePlusSeven")
                                $("#sel1 option[value=9]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "onePlusNine")
                                $("#sel1 option[value=10]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "automatic")
                                $("#sel1 option[value=11]").attr('selected', true).change();
                            else if (cospaceValue.defaultLayout == "onePlusN")
                                $("#sel1 option[value=12]").attr('selected', true).change();
                            // END DEFAULT LAYOUT AUTO-POPULATION
                            $("#ownerJid").val(cospaceValue.ownerJid);
                            $("#nm-page-loader").addClass("hide");
                        }
                        else {
                            $("#nm-page-loader").addClass("hide");
                            swal("Spacename does not exist! Please create a new coSpace..!");
                            $(that).val("");
                        }
                    });
                    isEntered = false;
                }, 1500);
            }
        }
    });
    // End cospacename of datalist type to get users

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
            var todelInput = $(this).siblings("#addMembers").val();
            memberNewObj = $.grep(memberObj, function (element, index) { return element.memberJid == todelInput }, true);
            $(this).parent().remove();
            console.log(memberNewObj);
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

    // Begin Pre-select radio button
    $("input[name=types][value='0']").prop("checked", true);
    // End Pre-select radio button

    // Begin show and hide input and datalist for meeting type
    $("input[name=types]").change(function () {
        if ($('input[name=types]:checked').val() == 0) {
            $("#Name").hide().fadeOut();
            $("#datalistname").show().fadeIn();
        }
        else {
            $("#Name").show().fadeIn();
            $("#datalistname").hide().fadeOut();
        }
    });
    // End show and hide input and datalist for meeting type

    $.each(meetingLayoutTranslation, function (key, value) {
        $('#sel1').append($("<option></option>").attr("value", key).text(value));
    });

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
                $("#nm-spacename-page-loader").removeClass("hide");
                setTimeout(function () {
                    httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
                        if (resp.data.coSpaces.attrkey.total == 1) {
                            $("#spaceNameCheck").addClass("hide").fadeOut();
                            swal('Space Name already exists...');
                            $("#nm-spacename-page-loader").addClass("hide");
                        }
                        else {
                            $("#nm-spacename-page-loader").addClass("hide");
                            $("#spaceNameCheck").removeClass("hide").fadeIn();
                        }
                    });
                }, 1200)
            }
            else $("#spaceNameCheck").addClass("hide").fadeOut();
        });

        $("#contact-create_space_URI").on("blur", function () {
            var checkcoSpaceUri = $(this).val();
            if (checkcoSpaceUri != "") {
                $("#nm-uri-page-loader").removeClass("hide");
                setTimeout(function () {
                    httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceUri, function (resp, err) {
                        if (resp.data.coSpaces.attrkey.total == 1) {
                            $("#spaceUriCheck").addClass("hide").fadeOut();
                            swal('URI already exists...');
                            $("#nm-uri-page-loader").removeClass("hide");

                        }
                        else {
                            $("#nm-uri-page-loader").addClass("hide");
                            $("#spaceUriCheck").removeClass("hide").fadeIn()
                        };
                    });
                }, 1200);
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
        if (checkedVal === "1") {  // IF CHECKEDVAL == 1 
            checkOneTimeMeeting();
        }
        else {
            console.log('empty')
        }
    });
    // END CHECK MEETING TYPE


    // BEGIN FILTER FOR COSPACE_USER_ID
    $(document).on("mouseleave", "#addMembers", function () {
        httpGet(apiType.GET_USERS + "?filter=" + $(this).val(), function (resp, err) {
            var userCospaceId = resp.data.users[0].user.attrkey.id;
            cospaceUSerIdArray.push(userCospaceId);
        });
    });
    // END FILTER FOR COSPACE_USER_ID

    avoidDuplicate = function (array) {
        var uniqueNames = [];
        $.each(array, function (i, el) {
            if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        return uniqueNames;
    }

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
                    $('#emails').html(templateHandlebar(resp.data));
                    isKeyEntered = false;
                });
            }, 1000);
        }
    });
    // END GET USERS

    // BEGIN COMBINE ARRAYS INTO ARRAY OF OBJECTS
    $(document).on("click", "#submitMembersBtn", function () {
        memberObj = [];
        if (memberNewObj == "" || memberNewObj == undefined) {
            $("input[name='addMembers']").each(function () {
                memArrayList.push($(this).val());
                memArray = avoidDuplicate(memArrayList);
            });

            $("[name='ownerspan']").each(function () {
                ownerArrayList.push($(this).attr("ifOwner"));

                // BEGIN ---------------POPULATE OWNERJID FIELD----------------
                if ($(this).attr("ifOwner") == "true") {
                    var jId = $(this).siblings("#addMembers").val();
                    $("#ownerJid").val(jId);
                }
                // END --------------POPULATE OWNERJID FIELD--------------------
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
            }
            console.log(memberObj);
        }
        else {
            memberObj = memberNewObj;
            memberNewObj = [];
            console.log(memberObj);
        }
    });
    // END COMBINE ARRAYS INTO ARRAY OF OBJECTS

    // BEGIN DELETE MEMBERS FROM EXISTING MEMBERS
    $(document).on("click", "#removeMember", function () {
        $(this).parent().remove();
    });
    // END DELETE MEMBERS FROM EXISTING MEMBERS

    // BEGIN FORM SUBMIT LOGIC
    $("#newMeetingDone").click(function () {
        debugger;
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                var startDateFormat = $("#fromdate").val().split('-');
                var startDate = startDateFormat[2] + '-' + startDateFormat[1] + '-' + startDateFormat[0];
                var fromTime = $("#fromtime").val();
                var fromTimeISO = startDate + ' ' + fromTime;
                var fromISO = moment(fromTimeISO).toISOString();
                var endDateFormat = $("#todate").val().split('-');
                var endDate = endDateFormat[2] + '-' + endDateFormat[1] + '-' + endDateFormat[0];
                var toTime = $("#totime").val();
                var toTimeISO = startDate + ' ' + toTime;
                var toISO = moment(toTimeISO).toISOString();
                var start = moment(fromISO).tz('Europe/London');
                var end = moment(toISO).tz('Europe/London');

                if ($('input[name=types]:checked').val() === "0") {
                    if (randomObj.spaceid == undefined) {
                        isCospaceId = "";
                    }
                    else { isCospaceId = randomObj.spaceid };

                    iscospacename = $("#cospace-name").val();
                }
                else if ($('input[name=types]:checked').val() === "1") {
                    if (randomObj.spaceid == undefined) {
                        isCospaceId = "";
                    }
                    else { isCospaceId = randomObj.spaceid };

                    iscospacename = $("#contact-sName").val();
                }
                var reqData = {
                    "coSpace": iscospacename,
                    "description": $("#description").val(),
                    "coSpaceId": isCospaceId,
                    "meetingStatus": 0,
                    "uri": $("#contact-create_space_URI").val(),
                    "defaultLayout": $('select[name=selectLayout]').val(),
                    "ownerJid": $("#ownerJid").val(),
                    "isInitiated": false,
                    "passcode": $("#passcode").val(),
                    "meetingType": parseInt($('input[name=types]:checked').val()),
                    "meetingStartDateTime": start._i,
                    "meetingEndDateTime": end._i,
                    "members": memberObj
                };
                if (window.location.pathname == "/newmeeting") {
                    httpPost(apiType.CREATE_MEETING, reqData, function (resp, err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            swal('New meeting creation successful');
                        }
                    });
                }
                else if (window.location.pathname == "/updatemeeting") {
                    var url = window.location.href;
                    var subString = url.substring(url.indexOf('=') + 1);
                    reqData.meetingID = parseInt(subString);
                    httpPut(apiType.UPDATE_MEETING, reqData, function (resp, err) {
                        if (err) console.log(err);
                        else {
                            console.log(resp);
                            swal('Meeting update successful');
                        }
                    });
                }
            }
        }
    });
    // END FORM SUBMIT LOGIC

});


