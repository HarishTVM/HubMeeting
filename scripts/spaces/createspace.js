$(document).ready(function () {

    $('#createSpace').show();
    $('#updateSpace').hide();

    //BEGIN Add Member Button Logic

    $('#addMemberBtn').on('click', function () {
        debugger;
        var member = $('<input list="members" name="addmembers" type="text" id="addMembers" placeholder="Add Member"/>\
                        <datalist id="members">\
                        <div id="memberAddDiv"></div>\
                        </datalist>');

        $('#memberParentDiv').append(member);
    });

    //END Add Member Button Logic

    //BEGIN Mirror populate input value logic
    $('#contact-sName').keyup(function () {
        $('#contact-create_space_URI').val(this.value);
        $('videoAdd').append(this.value);
    });
    //END Mirror populate input value logic

    // BEGIN GET USERS
    $('#addMembers').keyup(function () {
        debugger;
        var filterData = $('#addMembers').val();
        httpGet(apiType.GET_USERS + "?filter=" + filterData, function (resp) {
            // console.log(resp.data.users.attrkey.total);
            var totalUsers = resp.data.users.attrkey.total;
            localStorage.setItem("userInTotal", totalUsers);
            if (totalUsers > 1) {
                var userArray_1 = resp.data.users;
                // console.log(userData.length);
                var memberHandlebar = $('#memberAdd').html();
                var templateHandlebar = Handlebars.compile(memberHandlebar);
                $('#memberAddDiv').html(templateHandlebar(userArray_1));
            }
            else {
                var userArray_2 = resp.data.users;
                // var userJid = resp.data.users.user.userJid;
                // console.log(userJid.substring(userJid.indexOf('@')));
                var memberHandle = $('#memberAdd').html();
                var templateHandle = Handlebars.compile(memberHandle);
                $('#memberAddDiv').html(templateHandle(userArray_2));
            }
            
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

    // BEGIN CHIPS PLUGIN 
    $('#textarea').textext({
        plugins : 'tags prompt focus autocomplete ajax arrow',
        tagsItems : JSON.parse(response),
        prompt : 'Add one...',
        ajax : {
            method: "GET",
            url : app.BASE_URL + apiType.GET_USERS,
            dataType : 'json',
            cacheResults : true,
            success: function (response, status, xhr) {
                debugger;
                console.log(response);
            },
        }
    });
    // END CHIPS PLUGIN 
});