$(document).ready(function () {
    //BEGIN CHECK FOR MEETING TYPE
    $("#sel2").on("change", function(){
        if ($("#sel2").val() == "Personal") {
            personalMeeting();
        }
    });    
    //END CHECK FOR MEETING TYPE

    // BEGIN DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE
    var count = 0;
    var i;

    for (i in meetingType) {
        if (meetingType.hasOwnProperty(i)) {
            console.log(i);
            $("#typeMeeting").append(
                $('<label  />', {
                    'text': i                          
                }).prepend(
                    $('<input/>', { 
                        type: 'radio', 
                        name: 'types',
                        id: 'types' + meetingType[i],
                        value: meetingType[i]
                    })
                )
            );
            count++;
        }
    }

    for (i in meetingLayoutTranslation) {
        if (meetingLayoutTranslation.hasOwnProperty(i)) {
            $('#sel1').append($('<option>', {
                value: meetingLayoutTranslation.i,
                text: meetingLayoutTranslation[i]
            }));
            count++;
        }
    }
    // END DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE

});

personalMeeting = function () {
    // BEGIN EXISTING SPACENAME VERFICATION
    $("#contact-sName").blur(function () {
        debugger;
        var checkcoSpace = $(this).val();
        httpGet(apiType.GET_COSPACES + "?filter=" + checkcoSpace, function (resp, err) {
            
        });
    });
    // END EXISTING SPACENAME VERFICATION
}