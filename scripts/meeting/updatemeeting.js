// BEGIN GLOBAL VARIABLES
var offset = 0;
// END GLOBAL VARIABLES

$(document).ready(function () {
    //BEGIN DETERMINE THE PATHNAME
    if (window.location.pathname == "/newmeeting") {
        $("#meeting-page-loader").hide();
        $("#meetingList").addClass("active");
        $(".meeting-head-bread").html("Create Meeting");
        $("#createmeeting-breadcrumb").html("Create Meeting");
        $("#createMeeting").html("Create Meeting");
        $('#accordion').hide();
    }
    else if (window.location.pathname == "/updatemeeting") {
        $("#newMeetingForm").hide();
        $('#meeting-page-loader').show();
        $("#meetingList").addClass("active");
        $(".meeting-head-bread").html("Update Meeting");
        $("#createmeeting-breadcrumb").html("Update Meeting");
        $("#createMeeting").html("Update Meeting");
        debugger;

        // BEGIN AUTO_POPULATION OF FIELDS
        var url = window.location.href;
        var subString = url.substring(url.indexOf('=') + 1);
        setTimeout(function () {
            httpGet(apiType.GET_MEETING_BY_MEETINGID + "?meetingID=" + subString, function (resp, err) {
                debugger;
                console.log(resp.data);  
                if (resp.data.meetingType == 1)
                   { 
                    $('[name=types][value=1]').prop('checked', true);
                    $("#Name").show().fadeIn();
                    $("#datalistname").hide().fadeOut();
                    $("#contact-sName").val(resp.data.coSpace);
                }
                else {
                    $('[name=types][value=0]').prop('checked', true);
                    $("#Name").hide().fadeOut();
                    $("#datalistname").show().fadeIn();
                    $("#cospace-name").val(resp.data.coSpace)
                }
                randomObj.spaceid = resp.data.coSpaceId;
                console.log(randomObj.spaceid);
                $("#description").val(resp.data.description);
                $("#contact-create_space_URI").val(resp.data.uri);
                $("#passcode").val(resp.data.passcode);
                // BEGIN DEFAULT LAYOUT AUTO-POPULATION
                if (resp.data.defaultLayout == 0)
                    $("#sel1 option[value=0]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 1)
                    $("#sel1 option[value=1]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 2)
                    $("#sel1 option[value=2]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 3)
                    $("#sel1 option[value=3]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 4)
                    $("#sel1 option[value=4]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 5)
                    $("#sel1 option[value=5]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 6)
                    $("#sel1 option[value=6]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 7)
                    $("#sel1 option[value=7]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 8)
                    $("#sel1 option[value=8]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 9)
                    $("#sel1 option[value=9]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 10)
                    $("#sel1 option[value=10]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 11)
                    $("#sel1 option[value=11]").attr('selected', true).change();
                else if (resp.data.defaultLayout == 12)
                    $("#sel1 option[value=12]").attr('selected', true).change();
                // END DEFAULT LAYOUT AUTO-POPULATION
                var meetingStartDateTime = resp.data.meetingStartDateTime;
                var meetingEndDateTime = resp.data.meetingEndDateTime;
                var fromTime = moment(meetingStartDateTime).local().format("HH:mm");
                var toTime = moment(meetingEndDateTime).local().format("HH:mm");
                var fromDate = moment(meetingStartDateTime).format("DD-MM-YYYY");
                var toDate = moment(meetingStartDateTime).format("DD-MM-YYYY");
                $("#fromdate").val(fromDate);
                $("#fromtime").val(fromTime);
                $("#todate").val(toDate);
                $("#totime").val(toTime);
                $("#newMeetingForm").show();
                $('#meeting-page-loader').hide();
            });
        }, 1000)
        // END AUTO_POPULATION OF FIELDS

        // BEGIN GET MEMBERS FOR MEETING_ID
        $("#seeMoreMem").hide();
        httpGet(apiType.FIND_ALL_MEETING_MEMBERS + "?limit=10&" + "offset=" + offset + "&meetingID=" + subString, function (resp, err) {
            console.log(resp.data);
            if (resp.data.count != 0) {
                for (i = 0; i < resp.data.count; i++) {
                    var existMember = resp.data.rows[i].memberJid;
                    memberObj.push(existMember);
                    console.log(memberObj);
                    if (i <= 2) {
                        $("#accordianList_1").append('<li>' + existMember + '<a id="removeMember" class="accordian_mem_del_icon fa fa-lg fa-window-close" aria-hidden="true" title="remove"></a>' + '</li>');
                    }
                    else if (i >= 3 && i <= 5) {
                        $("#accordianList_2").append('<li>' + existMember + '<a id="removeMember" class="accordian_mem_del_icon fa fa-lg fa-window-close" aria-hidden="true" title="remove"></a>' + '</li>');
                    }
                    else if (i > 5 && i < resp.data.count) {
                        $("#seeMoreMem").show();
                        $("#seeMemModalBody").append('<li>' + existMember + '<a id="removeMember" class=" accordian_mem_del_icon fa fa-lg fa-window-close" aria-hidden="true" title="remove"></a>'+ '</li>');
                        $("#see-more-page-loader").hide();
                    }
                }
            }
            else {
                $("#accordion").hide();
            }
        });
        // END GET MEMBERS FOR MEETING_ID

    }
    else if (window.location.pathname == "/updateactivitymeeting") {
        $("#activityList").addClass("active");
        $(".meeting-head-bread").html("Update Meeting");
        $("#createmeeting-breadcrumb").html("Update Meeting");
        $("#createMeeting").html("Update Meeting");
    }
    //END DETERMINE THE PATHNAME

});