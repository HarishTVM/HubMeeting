$(document).ready(function () {
    
    //BEGIN CHECK FOR MEETING TYPE
    $("#contact-sName").on("focus", function(){
        debugger;
        var inputs = $("#typeMeeting").find("input");
        var checkedVal = $('input[name=types]:checked').val();
        if(checkedVal == 0){
            console.log("Personal button checked");
        }
    });

    // $("#sel2").on("change", function () {
    //     if ($("#sel2").val() == "Personal") {
    //     }
    // });
    //END CHECK FOR MEETING TYPE

    // BEGIN DROPDOWN IMPLEMENTATION FOR MEETING TYPE AND DEFAULT TEMPLATE
    var count = 0;
    var i;

    for (i in meetingType) {
        if (meetingType.hasOwnProperty(i)) {
            console.log(i);
            $("#typeMeeting").append(
                $('<label />', {
                    'text': i
                }).prepend(
                    $('<input />', {
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

    // BEGIN EXISTING SPACENAME VERFICATION
    $("#contact-sName").blur(function () {
        debugger;
        if ($("#contact-sName").val() != "") {
            var checkcoSpaceName = $(this).val();
            httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
                if (resp.data.coSpaces.attrkey.total >= 1) {
                    $("#spaceNameCheck").addClass("hide").fadeOut();
                    swal('Space Name already exists...');
                }
                else $("#spaceNameCheck").removeClass("hide").fadeIn();
            });
        }
        else $("#spaceNameCheck").addClass("hide").fadeOut();
    });

    $("#contact-create_space_URI").blur(function () {
        debugger;
        if ($("#contact-sName").val() != "") {
            var checkcoSpaceUri = $(this).val();
            httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceUri, function (resp, err) {
                if (resp.data.coSpaces.attrkey.total >= 1) {
                    $("#spaceUriCheck").addClass("hide").fadeOut();
                    swal('URI already exists...');
                }
                else $("#spaceUriCheck").removeClass("hide").fadeIn();
            });
        }
        else $("#spaceUriCheck").addClass("hide").fadeOut();
    });
    // END EXISTING SPACENAME VERFICATION

    // BEGIN CHECK IF OWNERJID FIELD ID FILLED
    var preventPropagate = true;
    $("#clickToAdd").on("click", function (e) {
        debugger;
        if ($("#ownerJid").val() == "") {
            if (preventPropagate) {
                e.stopPropagation();
                swal('Please fill ownerJid field...');
            }
        }
        else {
            preventPropagate = false;
        }
    });

    // END CHECK IF OWNERJID FIELD ID FILLED

    // BEGIN FORM SUBMIT LOGIC
    $("#newMeetingDone").click(function () {
        debugger;
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
        }
    });
    // END FORM SUBMIT LOGIC

});
