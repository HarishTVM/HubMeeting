$(document).ready(function(){
        //BEGIN DETERMINE THE PATHNAME
        if (window.location.pathname == "/newmeeting") {
            $(".meeting-head-bread").html("Create Meeting");
            $("#createmeeting-breadcrumb").html("Create Meeting");
            $("#createMeeting").html("Create Meeting");
        }
        else if (window.location.pathname == "/updatemeeting") {
            $(".meeting-head-bread").html("Update Meeting");
            $("#createmeeting-breadcrumb").html("Update Meeting");
            $("#createMeeting").html("Update Meeting");
        }
        //END DETERMINE THE PATHNAME
});