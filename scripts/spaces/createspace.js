$(document).ready(function () {
    var isKeyEntered = false;
    // BEGIN SELECTED OPTIONS FOR FORM DROPDOWN INPUTS
    // if (window.location.pathname == "/createspace") {
    //     $("#sel2").val("default");
    //     $("#sel1").val("default");
    // }
    // else {
    //     $("#sel2").val("opt1");
    //     $("#sel1").val("opt1");
    // }
    // END SELECTED OPTIONS FOR FORM DROPDOWN INPUTS

    //BEGIN CHECK CHILDERN LENGTH INSIDE EXISTING MEMBERS
    $(".alertClose").on('click', function () {
        var numItems = $('.alertClose').length;
        if (numItems == 0 || numItems == 1)
            $(this).parents("#accordion").remove();
        // numItems=numItems-1;    
    });

    //END CHECK CHILDERN LENGTH INSIDE EXISTING MEMBERS

    // BEGIN PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV
    if (window.location.pathname == "/createspace" || window.location.pathname == "/newmeeting") {
        $("#accordion").hide();
    }
    else {
        $("#accordion").show();
    }

    // $("#clickToAdd").click(function () {
    //     if (window.location.pathname == "/createspace" || window.location.pathname == "/newmeeting") {
    //         $("#admin").hide();
    //         $("#hrDept").hide();
    //     }
    //     else {
    //         $("#admin").show();
    //         $("#hrDept").show();
    //     }
    // });
    // END PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV

    //BEGIN DETERMINE THE PATHNAME
    if (window.location.pathname == "/createspace") {
        $(".meeting-head-bread").html("Create Space");
        $("#updatespace-breadcrumb").html("Create Space");
        $("#createSpace").html("Create Space");
    }
    else if (window.location.pathname == "/updatespace") {
        $(".meeting-head-bread").html("Update Space");
        $("#updatespace-breadcrumb").html("Update Space");
        $("#createSpace").html("Update Space");
    }
    //END DETERMINE THE PATHNAME

    //BEGIN FORM SUBMIT LOGIC

    // $('#btndone').click(function () {
    //     if ($('form').hasClass('validate-form')) {
    //         var resultItem = [];
    //         $('.validate-text').each(function (i, obj) {
    //             resultItem.push(validateText(obj));
    //         });

    //         if (resultItem.indexOf(false) < 0) {

    //             var reqData = {
    //                 "name": $('#contact-sName').val(),
    //                 "uri": $('#contact-create_space_URI').val(),
    //                 "passcode": $('#contact-sPasscode').val(),
    //                 "defaultLayout": $('#sel1').val(),

    //             };
    //             console.log(reqData);
    //             httpPost(apiType.CREATE_COSPACE, reqData, function (resp, err) {
    //                 if (err) {
    //                     if (err.customErrCode == errorCodes.BAD_REQUEST) {
    //                         toastr.options.closeButton = true;
    //                         toastr.error("Error: DuplicateCoSpaceUri");
    //                     }
    //                 }
    //                 else {
    //                     console.log(resp);
    //                     //Success Toast service
    //                     toastr.options.closeButton = true;
    //                     toastr.success("Cospace created successfully..!");
    //                     setTimeout(function () { window.location.href = "/spacelist" }, 5000);
    //                 }
    //             });
    //         }

    //     }
    // });
    //BEGIN FORM SUBMIT LOGIC

    //BEGIN FORM SUBMIT LOGIC FOR DEMO 1
    $('#createSpaceDone').click(function () {
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });
            if (resultItem.indexOf(false) < 0) {
                swal("Success!", "", "success");
                setTimeout(function () { window.location.href = "/spacelist" }, 2000);
            }
        }
    });
    //END FORM SUBMIT LOGIC FOR DEMO 1

    // BEGIN MODAL CLOSE LOGIC
    $("#myModal").modal({ show: false, backdrop: 'static', keyboard: false })
    // END MODAL CLOSE LOGIC

    // BEGIN POPULATE UPDATE COSPACE FORM
    setTimeout(function () {
        var url = window.location.href;
        var subString = url.substring(url.indexOf('=') + 1);
        // console.log(subString);
        httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + subString, function (resp, err) {
            $("#contact-sName").val(resp.data.coSpace.name);
            $("#contact-create_space_URI").val(resp.data.coSpace.uri);
            $("#fromdate").val("26-10-2017");
            $("#fromtime").val("26-10-2017");
            $("#todate").val("12:45");
            $("#totime").val("14:00");
            $(".update-page-loader").hide();
            $(".page-loader-div").show();
        });
    }, 1000);
    // END POPULATE UPDATE COSPACE FORM    
});

