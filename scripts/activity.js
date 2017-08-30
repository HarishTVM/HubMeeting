$(document).ready(function(){
 $('#btn_add_hidden').hide();
 $('#btn_meeting_details').hide();
  $('[data-toggle="tooltip"]').tooltip();   
 $("#btn_all").hover(function(){
   $('#btn_add').hide();
   $('#btn_add_hidden').show();
  },function(){
    $('#btn_add').show();
    $('#btn_add_hidden').hide();
});

$("#btn_meeting_details_all").hover(function(){
  $('#btn_meeting_details').show();
  $('#btu_ay_notification').hide();
 },function(){
  $('#btn_meeting_details').hide();
  $('#btu_ay_notification').show();
});

});
