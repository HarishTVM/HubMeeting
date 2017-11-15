$(document).ready(function () {

  //BEGIN EDIT OPTION IN MODAL LINKING
  $("#activityEditmodelBtn").on('click', function () {
    window.location.href = "/updateactivitymeeting";
  });

  $("#activeEditBtn").on('click', function () {
    window.location.href = "/updateactivitymeeting";
  });
  //END EDIT OPTION IN MODAL LINKING

  getRequestCurrentMeeting();
  getRecntMeeting();
 

  // BEGIN DELETE ACTIVE MEETING CARDS
  $("#activityDeleteBtn").live("click", function () {
    var activeMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
    var activeEle = $(activeMainEle).children("#activeMeetingName").attr("activeMeetingName");
    swal({
      title: "",
      text: "Are you sure you want to delete " + activeEle + " ?",
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

  // BEGIN DELETE RECENT MEETING CARDS
  $("#recentMeetingDelBtn").live("click", function () {
    var recentMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
    var recentEle = $(recentMainEle).children("#recentMeetingName").attr("recentMeetingName");
    swal({
      title: "",
      text: "Are you sure you want to delete " + recentEle + " ?",
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
  // END DELETE RECENT MEETING CARDS

});

// getCurrentMeeting =function(){

// } 

getRequestCurrentMeeting = function () {
  var offset = 0;
  //Bind the response using Handlebars
  // getRequestCurrentMeeting(apiType.FIND_ALL_MEETING + "?limit=" + queryTypesActive.LIMIT + "&offset=" + offset, function (response) {
  //   debugger;
  //   console.log(JSON.stringify(response))
  // });

  httpGet(apiType.FIND_ALL_MEETING + '?limit=' + queryTypesActive.LIMIT + '&offset=' + offset, function (resp) {
    for (i = 0; i < resp.data.rows.length; i++) {
      resp.data.rows[i].defaultLayout = meetingLayoutTranslation[resp.data.rows[i].defaultLayout]
      // Set data Append to Meeting types for API.
      resp.data.rows[i].meetingType = meetingTypeDetails[resp.data.rows[i].meetingType]
      // Set MeetingStatus for API.
      resp.data.rows.defaultLayout = meetingLayoutTranslation[resp.data.rows.defaultLayout]

      resp.data.rows[i].meetingStatus = meetingStatusColor[resp.data.rows[i].meetingStatus]

    }

    var meetingTemplate = Handlebars.compile($('#activeMeetingCardId').html());
    $('#activeMeetingCard').html(meetingTemplate(resp.data));
    //console.log(JSON.stringify(resp))
  });

  // $.getJSON('/json/currentmeeting.json', function (response) {
  //   console.log(response);
  //   var activityListTemplate = Handlebars.compile($('#activitylistCardId').html());
  //   $('#activity-card').html(activityListTemplate(response.data));
  // });
}
getRecntMeeting = function () {
  $.getJSON('/json/recentmeeting.json', function (response) {
  //  console.log(response);
    var recentMeetingTemplate = Handlebars.compile($('#recentMeetingCardId').html());
    $('#recent-meeting-card').html(recentMeetingTemplate(response.data));
  });
}