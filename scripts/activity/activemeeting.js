$(document).ready(function () {
    getRequestCurrentMeeting();
    getRecntMeeting();
});

getRequestCurrentMeeting = function () {
    var offset = 0;

    // httpGet(apiType.FIND_ALL_MEETING + '?limit=' + queryTypesActive.LIMIT + '&offset=' + offset, function (resp) {
    //     for (i = 0; i < resp.data.rows.length; i++) {
    //         // Set DefaultLayout for API.
    //         resp.data.rows[i].defaultLayout = meetingLayoutTranslation[resp.data.rows[i].defaultLayout]
    //         // Set data Append to Meeting types for API.
    //         resp.data.rows[i].meetingType = meetingTypeDetails[resp.data.rows[i].meetingType]
    //         // Set MeetingStatus for API.
    //         resp.data.rows[i].meetingStatus = meetingStatusColor[resp.data.rows[i].meetingStatus]

    //     }
    //     var meetingTemplate = Handlebars.compile($('#activeMeetingCardId').html());
    //     $('#activeMeetingCard').html(meetingTemplate(resp.data));
    // });

}
getRecntMeeting = function () {
    $.getJSON('/json/recentmeeting.json', function (response) {
        //  console.log(response);
        var recentMeetingTemplate = Handlebars.compile($('#recentMeetingCardId').html());
        $('#recent-meeting-card').html(recentMeetingTemplate(response.data));
    });
}