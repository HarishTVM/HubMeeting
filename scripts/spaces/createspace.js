$(document).ready(function () {
    var isKeyEntered = false;
    // BEGIN SELECTED OPTIONS FOR FORM DROPDOWN INPUTS
    if (window.location.pathname == "/createspace") {
        $("#sel2").val("default");
        $("#sel1").val("default");
    }
    else {
        $("#sel2").val("opt1");
        $("#sel1").val("opt1");
    }
    // END SELECTED OPTIONS FOR FORM DROPDOWN INPUTS

    //BEGIN CHECK CHILDERN LENGTH INSIDE EXISTING MEMBERS
    $(".alertClose").on('click', function () {
        var numItems = $('.alertClose').length;
        if (numItems == 0 || numItems == 1)
            $(this).parents("#existingMembers").remove();
        // numItems=numItems-1;    
    });

    //END CHECK CHILDERN LENGTH INSIDE EXISTING MEMBERS

    // BEGIN PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV
    if (window.location.pathname == "/createspace" || window.location.pathname == "/newmeeting") {
        $("#existingMembers").hide();
    }
    else {
        $("#existingMembers").show();
    }

    $("#clickToAdd").click(function () {
        if (window.location.pathname == "/createspace" || window.location.pathname == "/newmeeting") {
            $("#admin").hide();
            $("#hrDept").hide();
        }
        else {
            $("#admin").show();
            $("#hrDept").show();
        }
    });
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

    var filterArray = []; //ARRAY TO HOLD SCHEDULE MEETING MEMBERS

    //BEGIN Add Member and DELETE MEMBER Logic
    $('#addMemberBtn').live('click', function () {
        var member = $('<div id="addDeleteParent" class="input-group form-wrap input-box-shadow">\
                        <input id="addMembers" class="form-input" type="email" list="emails" autocomplete="off" multiple placeholder="add member...">\
                        <span id="deleteMember" class="input-group-addon"><a class="minus-icon fa fa-trash-o fa-lg" aria-hidden="true"></a></span>\
                        </div>\
                        <datalist id="emails">\
                            <input type="text" id="memberAddDiv">\
                        </datalist>');

        $('#memberParentDiv').append(member);
    });

    $("#deleteMember").live('click', function () {
        $(this).parent().remove();
    });

    //END Add Member and DELETE MEMBER Logic

    //BEGIN Mirror populate input value logic
    $('#contact-sName').on('keyup', function () {
        $('#contact-create_space_URI').val(this.value);
        $('videoAdd').append(this.value);
    });
    //END Mirror populate input value logic

    // BEGIN GET USERS
    $('#addMembers').live("keyup", function () {
        if (!isKeyEntered) {
            isKeyEntered = true;
            var that = this;
            setTimeout(function () {
                debugger;
                var filterData = $(that).val();
                httpGet(apiType.GET_USERS + "?filter=" + filterData, function (resp) {
                    debugger;
                    var totalUsers = resp.data.total;
                    // filterArray.push(filterData);   
                    // filterData = undefined;
                    // console.log(userData.length);
                    var memberHandlebar = $('#memberAdd').html();
                    var templateHandlebar = Handlebars.compile(memberHandlebar);
                    $('#memberAddDiv').html(templateHandlebar(resp.data));
                    isKeyEntered = false;
                });
            }, 1000);
        }
    });

    // END GET USERS

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
    $('#btndone').click(function () {
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
    setTimeout(function(){
        var url = window.location.href;
        var subString = url.substring(url.indexOf('=') + 1);
        // console.log(subString);
        httpGet(apiType.GET_COSPACES_BY_ID + "?coSpaceid=" + subString, function (resp, err) {
            $("#contact-sName").val(resp.data.coSpace.name);
            $("#contact-create_space_URI").val(resp.data.coSpace.uri);
            // $("#sel1 option[value='Allequal']").prop("selected", true);
            // $("#sel2 option[value='One Time']").val("selected", true);
            $("#fromdate").val("26-10-2017");
            $("#fromtime").val("26-10-2017");
            $("#todate").val("12:45");
            $("#totime").val("14:00");
        });
    }, 1000);
    // END POPULATE UPDATE COSPACE FORM

    // BEGIN MOMENT.JS CODE LOGIC 
        console.log(moment().format());
        // END MOMENT.JS CODE LOGIC 
        console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        console.log(typeof moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        console.log(moment().format("ddd, hA"));
        console.log(moment());
});

