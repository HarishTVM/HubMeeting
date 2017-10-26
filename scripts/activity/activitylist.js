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

  // BEGIN DELETE ACTIVE MEETING CARDS
  $("#activityDeleteBtn").live("click", function () {
    var mainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
    var ele = $(mainEle).children("#activeMeetingName").attr("activeMeetingName");
    debugger;
    swal({
      title: "",
      text: "Are you sure you want to delete " + ele + " ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
      function () {
        swal("Deleted!", "", "success");
      });
  });
  // END DELETE ACTIVE MEETING CARDS

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