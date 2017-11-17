$(document).ready(function () {
    //BEGIN DETERMINE THE PATHNAME
    if (window.location.pathname == "/newmeeting") {
        $("#meetingList").addClass("active");
        $(".meeting-head-bread").html("Create Meeting");
        $("#createmeeting-breadcrumb").html("Create Meeting");
        $("#createMeeting").html("Create Meeting");
    }
    else if (window.location.pathname == "/updatemeeting") {
        $("#meetingList").addClass("active");
        $(".meeting-head-bread").html("Update Meeting");
        $("#createmeeting-breadcrumb").html("Update Meeting");
        $("#createMeeting").html("Update Meeting");

        // BEGIN AUTO_POPULATION OF FIELDS
        var url = window.location.href;
        var subString = url.substring(url.indexOf('=') + 1);
        httpGet(apiType.GET_MEETING_BY_MEETINGID + "?meetingID=" + subString, function(resp, err){
            debugger;
            console.log(resp.data);
            if(resp.data.meetingType == 1){
                $('[name=][value=]').prop('checked',true);
                
            }
            $("#contact-sName").val(resp.data.coSpace);
            $("#description").val(resp.data.description);
            $("#contact-create_space_URI").val(resp.data.uri);
            $("#passcode").val(resp.data.passcode);
            // $("#sel1 option[value=resp.data.defaultLayout]").prop("selected", true);
            var meetingStartDateTime = resp.data.meetingStartDateTime;
            var meetingEndDateTime = resp.data.meetingEndDateTime;
            console.log(meetingStartDateTime);
            console.log(meetingEndDateTime);
            
        });
        // END AUTO_POPULATION OF FIELDS

    }
    else if (window.location.pathname == "/updateactivitymeeting") {
        $("#activityList").addClass("active");
        $(".meeting-head-bread").html("Update Meeting");
        $("#createmeeting-breadcrumb").html("Update Meeting");
        $("#createMeeting").html("Update Meeting");
    }
    //END DETERMINE THE PATHNAME

});