// BEGIN ---------------------GLOBAL VARIABLES---------------------
var cs_recentsearch = "";
var cs_isOwner = false
// BEGIN CREATE ARRAY OF MEMBERS 
var cs_memArrayList = [], cs_memArray = [];
var cs_ownerArrayList = [], cs_ownerArr = [];
var cs_cospaceUSerIdArray = [], cs_coUserArr = [];
var cs_newArray = [];
var cs_memberObj = [], cs_memberNewObj = [];
var cs_owner = {};
// BEGIN CREATE ARRAY OF MEMBERS

// BEGIN OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
var cs_randomObj = {};
// END OBJECT TO HOLD COSPACEID FOR PERSONAL MEETING
// END ---------------------GLOBAL VARIABLES---------------------

$(document).ready(function () {
    var cs_isKeyEntered = false;
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
    // $("#ownerIcon").live("click", function () {
    //     $(this).toggle(function () {
    //         $(this).children().css("color", "#2ed3ae");
    //         $(this).children().attr('title', 'Active Owner');
    //         cs_isOwner = true;
    //         $(this).attr("ifOwner", cs_isOwner);
    //     }, function () {
    //         $(this).children().css("color", "black");
    //         $(this).children().attr('title', 'Deactive Owner');
    //         cs_isOwner = false;
    //         $(this).attr("ifOwner", cs_isOwner);
    //     }).trigger('click');
    // });
    // ---------- END MAKE A MEMBER OWNER ---------------

    //BEGIN Add Member and DELETE MEMBER Logic
    // $('#addMemberBtn').live('click', function () {
    //     var member = $('<div id="addDeleteParent" class="input-group form-wrap input-box-shadow">\
    //                             <input name="addMembers" id="addMembers" class="form-input" type="email" list="emails" autocomplete="off" multiple placeholder="add member...">\
    //                             <span name="ownerspan" id="ownerIcon" ifOwner="false" class="bg-gray input-group-addon"><a class="fa fa-user-circle fa-lg" aria-hidden="true" title="Owner"></a></span>\
    //                             <span id="deleteMember" class="input-group-addon"><a class="minus-icon fa fa-trash-o fa-lg" aria-hidden="true"></a></span>\
    //                             </div>\
    //                             <datalist id="emails">\
    //                             <option id="memberAddDiv"></option>\
    //                             </datalist>');

    //     $('#memberParentDiv').append(member);
    // });

    // $("#deleteMember").live('click', function () {
    //     if ($(this).parents("#memberParentDiv").children('div').length == 1) {
    //         $(this).prop('disabled', true);
    //     }
    //     else {
    //         var todelInput = $(this).siblings("#addMembers").val();
    //         cs_memberNewObj = $.grep(cs_memberObj, function (element, index) { return element.memberJid == todelInput }, true);
    //         $(this).parent().remove();
    //         console.log(cs_memberNewObj);
    //     }
    // });
    //END Add Member and DELETE MEMBER Logic

    // BEGIN FILTER FOR COSPACE_USER_ID
    // $(document).on("mouseleave", "#addMembers", function () {
    //     httpGet(apiType.GET_USERS + "?filter=" + $(this).val(), function (resp, err) {
    //         var userCospaceId = resp.data.users[0].user.attrkey.id;
    //         cs_cospaceUSerIdArray.push(userCospaceId);
    //     });
    // });
    // END FILTER FOR COSPACE_USER_ID

    // avoidDuplicate = function (array) {
    //     var uniqueNames = [];
    //     $.each(array, function (i, el) {
    //         if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    //     });
    //     return uniqueNames;
    // }

    // BEGIN PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV
    // if (window.location.pathname == "/createspace" || window.location.pathname == "/newmeeting") {
    //     $("#accordion").hide();
    // }
    // else {
    //     $("#accordion").show();
    // }
    // END PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV

    // BEGIN COMBINE ARRAYS INTO ARRAY OF OBJECTS
    // $(document).on("click", "#submitMembersBtn", function () {
    //     cs_memberObj = [];
    //     if (cs_memberNewObj == "" || cs_memberNewObj == undefined) {
    //         $("input[name='addMembers']").each(function () {
    //             cs_memArrayList.push($(this).val());
    //             cs_memArray = avoidDuplicate(cs_memArrayList);
    //         });

    //         $("[name='ownerspan']").each(function () {
    //             cs_ownerArrayList.push($(this).attr("ifOwner"));

    //             // BEGIN ---------------POPULATE OWNERJID FIELD----------------
    //             if ($(this).attr("ifOwner") == "true") {
    //                 var jId = $(this).siblings("#addMembers").val();
    //                 $("#ownerJid").val(jId);
    //             }
    //             // END --------------POPULATE OWNERJID FIELD--------------------
    //         });

    //         cs_newArray = cs_memArray.map(function (value, index) {
    //             return value + ':' + cs_ownerArrayList[index] + ':' + cs_cospaceUSerIdArray[index];
    //         });

    //         var sampleArray = [];
    //         for (i = 0; i < cs_newArray.length; i++) {
    //             sampleArray = cs_newArray[i].split(':');

    //             var member1 = {
    //                 "memberJid": sampleArray[0],
    //                 "cs_isOwner": sampleArray[1],
    //                 "coSpaceUserID": sampleArray[2]
    //             }
    //             cs_memberObj.push(member1);
    //         }
    //         console.log(cs_memberObj);
    //     }
    //     else {
    //         cs_memberObj = cs_memberNewObj;
    //         cs_memberNewObj = [];
    //         console.log(cs_memberObj);
    //     }
    // });
    // END COMBINE ARRAYS INTO ARRAY OF OBJECTS

    // BEGIN DELETE MEMBERS FROM EXISTING MEMBERS
    // $(document).on("click", "#removeMember", function () {
    //     $(this).parent().remove();
    // });
    // END DELETE MEMBERS FROM EXISTING MEMBERS

    // $("#contact-sName").on("blur", function () {
    //     if ($("#contact-sName").val() != "") {
    //         var checkcoSpaceName = $(this).val();
    //         httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
    //             if (resp.data.coSpaces.attrkey.total == 1) {
    //                 $("#spaceNameCheck").addClass("hide").fadeOut();
    //                 // swal('Space Name already exists...');
    //                 var cospace = resp.data.coSpaces.coSpace.attrkey.id;
    //                 httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + cospace, function (response, error) {
    //                     var getcospace = response.data.coSpace;
    //                     $("#contact-create_space_URI").val(getcospace.uri);
    //                     $("#passcode").val(getcospace.passcode);
    //                     cs_owner.ownerJid = getcospace.ownerJid;
    //                     cs_owner.ownerid = getcospace.ownerId;
    //                     // BEGIN DEFAULT LAYOUT AUTO-POPULATION
    //                     if (resp.data.defaultLayout == "allEqual")
    //                         $("#sel1 option[value=0]").attr('selected', true).change();
    //                     if (resp.data.defaultLayout == "speakerOnly")
    //                         $("#sel1 option[value=1]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "telepresence")
    //                         $("#sel1 option[value=2]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "stacked")
    //                         $("#sel1 option[value=3]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "allEqualQuarters")
    //                         $("#sel1 option[value=4]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "allEqualNinths")
    //                         $("#sel1 option[value=5]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "allEqualSixteenths")
    //                         $("#sel1 option[value=6]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "allEqualTwentyFifths")
    //                         $("#sel1 option[value=7]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "onePlusFive")
    //                         $("#sel1 option[value=8]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "onePlusSeven")
    //                         $("#sel1 option[value=9]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "onePlusNine")
    //                         $("#sel1 option[value=10]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "automatic")
    //                         $("#sel1 option[value=11]").attr('selected', true).change();
    //                     else if (resp.data.defaultLayout == "onePlusN")
    //                         $("#sel1 option[value=12]").attr('selected', true).change();
    //                     // END DEFAULT LAYOUT AUTO-POPULATION
    //                     cs_randomObj.spaceid = getcospace.attrkey.id;
    //                 });
    //             }
    //             else {
    //                 $("#spaceNameCheck").removeClass("hide").fadeIn();
    //             }
    //         });
    //     }
    //     else $("#spaceNameCheck").addClass("hide").fadeOut();
    // });

    // Begin check for existing User from OwnerJid
    $("#ownerJid").blur(function () {
        var cs_input = $(this).val();
        if (cs_input != "") {
            $("#cs-page-loader").removeClass("hide");
            setTimeout(function () {
                httpGet(apiType.GET_USERS + "?filter=" + cs_input, function (resp, err) {
                    if (resp.data.total == 1) {
                        $("#ownerJid").val(resp.data.users[0].user.userJid);
                        $("#spaceOwnerCheck").removeClass("hide").fadeIn();
                        $("#cs-page-loader").addClass("hide");
                    }
                    else {
                        $("#cs-page-loader").addClass("hide");
                        swal('Please enter a valid ownerID...');
                    }
                });
            }, 1500);
        }
        else{
            $("#spaceOwnerCheck").addClass("hide").fadeOut();
        }
    });
    // End check for existing User from OwnerJid

    //BEGIN FORM SUBMIT LOGIC
    $('#cs_createSpaceDone').click(function () {
        debugger;
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });

            if (resultItem.indexOf(false) < 0) {
                var cs_req_data = {
                    "ownerJid": $("#ownerJid").val(),
                    "coSpace": $("#contact-sName").val(),
                    "uri": $("#contact-create_space_URI").val(),
                    "passcode": $("#passcode").val(),
                    "defaultLayout": $("#sel1").val(),
                    "cdrTag": "",
                    "ownerId": ""
                }
                console.log(cs_req_data);
                httpPost(apiType.CREATE_COSPACE, cs_req_data, function (resp, err) {
                    if (err) {
                        if (err.customErrCode == errorCodes.BAD_REQUEST) {
                            toastr.options.closeButton = true;
                            toastr.error("Error: DuplicateCoSpaceUri");
                        }
                    }
                    else {
                        swal(
                            'Good job!',
                            'coSpace created!',
                            'success'
                          )
                        setTimeout(function () { window.location.href = "/spacelist" }, 5000);
                    }
                });
            }

        }
    });
    //BEGIN FORM SUBMIT LOGIC

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

