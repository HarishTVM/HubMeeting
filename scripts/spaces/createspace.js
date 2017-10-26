$(document).ready(function () {
    // BEGIN PRE-POPOPULATED MEMBERS IN ADD MEMBERS DIV
        if (window.location.pathname == "/createspace" || window.location.pathname == "/newMeeting") {
            $("#existingMembers").hide();
        }
        else {
            $("#existingMembers").show();
        }

        $("#clickToAdd").click(function(){
            if (window.location.pathname == "/createspace" || window.location.pathname == "/newMeeting") {
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
        $(".meeting-head-bread").html("CMS Hub Create Space");
        $("#updatespace-breadcrumb").html("Create Space");
        $("#createSpace").html("Create Space");
    }
    else if (window.location.pathname == "/updatespace") {
        $(".meeting-head-bread").html("CMS Hub Update Space");
        $("#updatespace-breadcrumb").html("Update Space");
        $("#createSpace").html("Update Space");
    }
    //END DETERMINE THE PATHNAME

    var isKeyEntered = false;
    $('#createSpace').show();
    $('#updateSpace').hide();

    var filterArray = []; //ARRAY TO HOLD SCHEDULE MEETING MEMBERS

    //BEGIN Add Member and DELETE MEMBER Logic
    $('#addMemberBtn').live('click', function () {
        debugger;
        var member = $('<div id="addDeleteParent" class="addDeleteParent input-group form-wrap input-box-shadow">\
                        <input id="addMembers" class="form-input" type="email" list="emails" autocomplete="off" multiple placeholder="add member...">\
                        <span id="searchMember" class="bg-gray input-group-addon"><a class="search-member-icon fa fa-search fa-lg" aria-hidden="true"></a></span>\
                        <span id="deleteMember" class="input-group-addon"><a class="minus-icon fa fa-trash-o fa-lg" aria-hidden="true"></a></span>\
                        </div>\
                        <datalist id="emails">\
                            <div id="memberAddDiv"></div>\
                        </datalist>');

        $('#memberParentDiv').append(member);
    });

    $("#deleteMember").live('click', function () {
        debugger;
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
    $('#searchMember').live('click', function () {
        debugger;
        var filterData = $(this).siblings("#addMembers").val();
        httpGet(apiType.GET_USERS + "?filter=" + filterData, function (resp) {
            var totalUsers = resp.data.total;
            // filterArray.push(filterData);   
            // filterData = undefined;
            // console.log(userData.length);
            var memberHandlebar = $('#memberAdd').html();
            var templateHandlebar = Handlebars.compile(memberHandlebar);
            $('#memberAddDiv').html(templateHandlebar(resp.data));
        });

    });
    // END GET USERS


    $('#btndone').click(function () {
        if ($('form').hasClass('validate-form')) {
            var resultItem = [];
            $('.validate-text').each(function (i, obj) {
                resultItem.push(validateText(obj));
            });

            if (resultItem.indexOf(false) < 0) {

                var reqData = {
                    "name": $('#contact-sName').val(),
                    "uri": $('#contact-create_space_URI').val(),
                    "passcode": $('#contact-sPasscode').val(),
                    "defaultLayout": $('#sel1').val(),

                };
                console.log(reqData);
                httpPost(apiType.CREATE_COSPACE, reqData, function (resp, err) {
                    if (err) {
                        if (err.customErrCode == errorCodes.BAD_REQUEST) {
                            toastr.options.closeButton = true;
                            toastr.error("Error: DuplicateCoSpaceUri");
                        }
                    }
                    else {
                        console.log(resp);
                        //Success Toast service
                        toastr.options.closeButton = true;
                        toastr.success("Cospace created successfully..!");
                        setTimeout(function () { window.location.href = "/spacelist" }, 5000);
                    }
                });
            }

        }
    });

    // BEGIN MODAL CLOSE LOGIC
    $("#myModal").modal({ show: false, backdrop: 'static', keyboard: false })
    // END MODAL CLOSE LOGIC
});