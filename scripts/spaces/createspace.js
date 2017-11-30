// BEGIN ---------------------GLOBAL VARIABLES---------------------
var isKeyEntered = false;
var isOwner = false
var func;
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
    var count = 0, i;
    for (i in meetingLayoutTranslation) {
        if (meetingLayoutTranslation.hasOwnProperty(i)) {
            $('#sel1').append($('<option />', {
                value: i,
                text: meetingLayoutTranslation[i]
            }));
            count++;
        }
    }

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

    // BEGIN PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV
    if (window.location.pathname == "/createspace" || window.location.pathname == "/newmeeting") {
        $("#accordion").hide();
    }
    else {
        $("#accordion").show();
    }
    // END PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV

    //BEGIN DETERMINE THE PATHNAME
    if (window.location.pathname == "/createspace") {
        $(".meeting-head-bread").html("Create Space");
        $("#updatespace-breadcrumb").html("Create Space");
        $("#createSpace").html("Create Space");
    }
    else if (window.location.pathname == "/updatespace") {
        $(".meeting-head-bread").html("Update Space");
        $("#updatespace-breadcrumb").html("Update Space");
        $("#createSpace").html("Update Space");
    }
    //END DETERMINE THE PATHNAME

    // BEGIN COMBINE ARRAYS INTO ARRAY OF OBJECTS
    $(document).on("click", "#submitMembersBtn", function () {
        debugger;
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

    //BEGIN FORM SUBMIT LOGIC
    $('#btndone').click(function () {
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });

            if (resultItem.indexOf(false) < 0) {

                var reqData = {
                    "name": $('#contact-sName').val(),
                    "uri": $('#contact-create_space_URI').val(),
                    "passcode": $('#contact-sPasscode').val(),
                    "defaultLayout": $('#sel1').val(),

                };
                console.log(reqData);
                httpPost(apiType.CREATE_COSPACE, reqData, function (resp, err) {
                    if (err) {
                        if (err.customErrCode == errorCodes.BAD_REQUEST) {
                            toastr.options.closeButton = true;
                            toastr.error("Error: DuplicateCoSpaceUri");
                        }
                    }
                    else {
                        console.log(resp);
                        //Success Toast service
                        toastr.options.closeButton = true;
                        toastr.success("Cospace created successfully..!");
                        setTimeout(function () { window.location.href = "/spacelist" }, 5000);
                    }
                });
            }

        }
    });
    //BEGIN FORM SUBMIT LOGIC

    //BEGIN FORM SUBMIT LOGIC FOR DEMO 1
    $('#createSpaceDone').click(function () {
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                swal("Success!", "", "success");
                setTimeout(function () { window.location.href = "/spacelist" }, 2000);
            }
        }
    });
    //END FORM SUBMIT LOGIC FOR DEMO 1

    // BEGIN MODAL CLOSE LOGIC
    $("#myModal").modal({ show: false, backdrop: 'static', keyboard: false })
    // END MODAL CLOSE LOGIC

    // BEGIN POPULATE UPDATE COSPACE FORM
    setTimeout(function () {
        var url = window.location.href;
        var subString = url.substring(url.indexOf('=') + 1);
        // console.log(subString);
        httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + subString, function (resp, err) {
            $("#contact-sName").val(resp.data.coSpace.name);
            $("#contact-create_space_URI").val(resp.data.coSpace.uri);
            $("#fromdate").val("26-10-2017");
            $("#fromtime").val("26-10-2017");
            $("#todate").val("12:45");
            $("#totime").val("14:00");
            $(".update-page-loader").hide();
            $(".page-loader-div").show();
        });
    }, 1000);
    // END POPULATE UPDATE COSPACE FORM    
});

