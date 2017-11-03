$(document).ready(function () {

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

    //BEGIN CHECK FOR MEETING TYPE
    $("#contact-sName").on("focus", function () {
        // var inputs = $("#typeMeeting").find("input");
        var checkedVal = $('input[name=types]:checked').val();
        if (checkedVal == 0) {
            $("#contact-sName").blur(function () {
                debugger;
                if ($("#contact-sName").val() != "") {
                    var checkcoSpaceName = $(this).val();
                    httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
                        debugger
                        if (resp.data.coSpaces.attrkey.total == 1) {
                            $("#spaceNameCheck").addClass("hide").fadeOut();
                            // swal('Space Name already exists...');
                            var cospace = resp.data.coSpaces.coSpace.attrkey.id;
                            httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + cospace, function(cospace_resp, err){
                                debugger;
                                var getcospace = cospace_resp.data.coSpace;
                                $("#contact-create_space_URI").val(getcospace.uri);
                                $("#passcode").val(getcospace.passcode);
                                $("#ownerJid").val(getcospace.ownerJid);
                                if(getcospace.defaultLayout != ""){
                                    $('#sel1 option:selected').removeAttr('selected');
                                    $("#sel1").val(getcospace.defaultLayout).change();
                                }
                            });
                        }
                        else {
                            $("#spaceNameCheck").removeClass("hide").fadeIn();
                        }
                    });
                }
                else $("#spaceNameCheck").addClass("hide").fadeOut();
            });
        }
        else {  // IF CHECKEDVAL == 1 
            newMeetingFunc();
        }
    });
    //END CHECK FOR MEETING TYPE

    // BEGIN THIS FUNCTION WILL CALLED BASDED ON MEETING TYPES
    newMeetingFunc = function () {
        // BEGIN EXISTING SPACENAME AND URI VALIDATION
        $("#contact-sName").blur(function () {
            debugger;
            if ($("#contact-sName").val() != "") {
                var checkcoSpaceName = $(this).val();
                httpGet(apiType.CHECK_COSPACE_EXISTENCE + "?filter=" + checkcoSpaceName, function (resp, err) {
                    if (resp.data.coSpaces.attrkey.total == 1) {
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
                    if (resp.data.coSpaces.attrkey.total == 1) {
                        $("#spaceUriCheck").addClass("hide").fadeOut();
                        swal('URI already exists...');
                    }
                    else $("#spaceUriCheck").removeClass("hide").fadeIn();
                });
            }
            else $("#spaceUriCheck").addClass("hide").fadeOut();
        });
        // END EXISTING SPACENAME AND URI VALIDATION

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
    }
    // END THIS FUNCTION WILL CALLED BASDED ON MEETING TYPES

    // BEGIN FORM SUBMIT LOGIC
    $("#newMeetingDone").click(function () {
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                //CREATE MEETING API IMPLEMENTATION TO BE CODED
            }
        }
    });
    // END FORM SUBMIT LOGIC
});
