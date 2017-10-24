$(document).ready(function () {
    
    getMeeting();
});
getMeeting = function () {
    $.getJSON('/json/meeting.json', function (response) {
        console.log(response);
        var meetingTemplate = Handlebars.compile($('#meetingCardId').html());
        $('#meeting-card').html(meetingTemplate(response.data));
    });
}