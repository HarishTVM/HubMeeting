$(document).ready(function () {
    
    getMeeting();
    meetingModal();
    // BEGIN DELETE MEETING CARDS
    $("#meetingDelBtn").live("click", function(){
        debugger;
        var mainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var ele = $(mainEle).children("#meetingName").attr("meetingName");
        swal({
            title:"",
            text: "Are you sure you want to delete " + ele + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function(){
            swal("Deleted!", "", "success");
        });
    });  
    // END DELETE MEETING CARDS
});

getMeeting = function () {
    $.getJSON('/json/meeting.json', function (response) {
        console.log(response);
        var meetingTemplate = Handlebars.compile($('#meetingCardId').html());
        $('#meeting-card').html(meetingTemplate(response.data));
       
    });

}
meetingModal = function () {
    $.getJSON('/json/meeting.json', function (response) {
        console.log(response);
        var meetingModalTemplate = Handlebars.compile($('#meetingModalId').html());
        $('#modal').html(meetingModalTemplate(response.data));
    });
}

