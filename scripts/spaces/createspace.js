$(document).ready(function () {

    $('#createSpace').show();
    $('#updateSpace').hide();
    
    var filterArray = [];
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

    $("#deleteMember").live('click', function(){
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
    $('#searchMember').on('click', function () {
        debugger;
        var filterData = $(this).siblings("#addMembers").val();
        httpGet(apiType.GET_USERS + "?filter=" + filterData, function (resp) {
            var totalUsers = resp.data.total;
            if (totalUsers > 1) {
                var userArray_1 = resp.data;
                filterArray.push(filterData);   
                filterData = undefined;
                // console.log(userData.length);
                var memberHandlebar = $('#memberAdd').html();
                var templateHandlebar = Handlebars.compile(memberHandlebar);
                $('#memberAddDiv').html(templateHandlebar(userArray_1));

            }
            else if(totalUsers == 1){
                var userArray_2 = resp.data;
                filterArray.push(filterData);   
                filterData = undefined;
                // var userJid = resp.data.users.user.userJid;
                // console.log(userJid.substring(userJid.indexOf('@')));
                var memberHandle = $('#memberAdd').html();
                var templateHandle = Handlebars.compile(memberHandle);
                $('#memberAddDiv').html(templateHandle(userArray_2));
            }
            else{
                console.log("No matching users..!")
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

    // BEGIN MODAL CLOSE LOGIC
        $("#myModal").modal({show: false, backdrop: 'static', keyboard: false})
    // END MODAL CLOSE LOGIC
});