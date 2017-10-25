$(document).ready(function () {

  getCurrentMeeting();
  getRecntMeeting();
  $('#btn_add_hidden').hide();
  $('#btn_meeting_details').hide();
  $('[data-toggle="tooltip"]').tooltip();
  var clickFlag = false;

  $("#btn_all").hover(function () {
    $('#btn_add').hide();
    $('#btn_add_hidden').show();
  }, function () {
    $('#btn_add').show();
    $('#btn_add_hidden').hide();
  });

  $("#btn_meeting_details_all").hover(function () {
    $('#btn_meeting_details').show();
    $('#btu_ay_notification').hide();
  }, function () {
    if (clickFlag) {
      $('#btn_meeting_details').hide();
      $('#btu_ay_notification').show();
    }

  });

  $("#btn_call_ur").click(function () {
    $('#btn_meeting_details').show();
    var clickFlag = true;
  });


  $(function () {
    $('.div-background').hover(function () {
      $(this).css('background-color', '#fffff0');
    },
      function () {
        $(this).css('background-color', '#FFF');
      });
  });

});
getCurrentMeeting = function () {
  $.getJSON('/json/currentmeeting.json', function (response) {
      console.log(response);
      var activityListTemplate = Handlebars.compile($('#activitylistCardId').html());
      $('#activity-card').html(activityListTemplate(response.data));
  });
}
getRecntMeeting = function () {
  $.getJSON('/json/recentmeeting.json', function (response) {
      console.log(response);
      var recentMeetingTemplate = Handlebars.compile($('#recentMeetingCardId').html());
      $('#recent-meeting-card').html(recentMeetingTemplate(response.data));
  });
}