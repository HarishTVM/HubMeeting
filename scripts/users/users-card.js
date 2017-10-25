var firstPageObj = null;
var searchUsers = "";
var noData;
$(document).ready(function () {
 
    $('#page-loaders-users').show();
    $('.div-loaders-users').hide();

    var isKeyEntered = false;
    getUsers();
    $('#filter-users').keyup(function () {
        filterUsers(isKeyEntered);
    });
});

function getUsersHttpRequest(query, page, callback) {
    if (page == 1)
        callback(firstPageObj);
    else {
        httpGet(query, function (getUsers) {
            callback(getUsers);
        });
    }
}

getUsers = function () {
    getCurrentMeeting();
    getRecntMeeting();
    $('.div-loaders-users').show();
    $('#page-loaders-users').show();

    var offset = 0, pages;
    //GET getUsers records
    httpGet(apiType.GET_USERS + '?&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
        var totalRec = resp.data.total; //Total coSpace records
        pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination
        firstPageObj = resp;
        //Pagination Logic
        $('.sync-pagination').twbsPagination({
            totalPages: pages,
            prev: 'Prev',
            next: 'Next',
            onPageClick: function (event, page) {
                //  $("#users-card").hide();
                $('.div-loaders-users').show();
                $('#page-loaders-users').hide();
                if ($('.div-loaders-users').show()) {
                    $('.bg-white').each(function () {
                        this.style.setProperty('background-color', '#f2f2f2', 'important');
                    });
                }
                offset = queryTypes.LIMIT * (page - 1);
                if (offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                getUsersHttpRequest(apiType.GET_USERS + "?offset=" + offset + "&limit=" + queryTypes.LIMIT, page, function (resp) {
                    //Bind the response using Handlebars
                    $("#users-card").show();
                    // for(var i = 0;i < resp.data.users.length; i++ ){
                    //     alert(resp.data.users[i].user.userJid);
                    // }

                    var templateUsers = Handlebars.compile($('#users-cardID').html());
                    $('#users-card').html(templateUsers(resp.data));
                    $('.div-loaders-users').hide();
                    $('#page-loaders-users').hide();
                  
                });
            },
            hideOnlyOnePage: true
        });
    });
}

filterUsers = function (isKeyEntered) {
    $("#users-card").hide();
    $('#page-loaders-users').show();

    if (!isKeyEntered) {
        isKeyEntered = true;
        setTimeout(function () {
            $("#filter-users").prop("disabled", true);
            $('.sync-pagination').empty();
            $('.sync-pagination').removeData("twbs-pagination");
            $('.sync-pagination').unbind("page");

            var offset = 0;
            var input = $('#filter-users').val();
            if (input.length > 0) {
                $("#users-card").show();
                if (searchUsers != input) {
                    searchUsers = input;
                    httpGet(apiType.GET_USERS + "?filter=" + input + '&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (getUsers) {
                        var totalRec = getUsers.data.total; //Total getUsees records
                        var pages = Math.ceil((parseInt(getUsers.data.total) / queryTypes.LIMIT)); //No of pages in pagination

                        if (getUsers.data.total == 0) {
                            $('#page-loaders-users').hide();
                            $("#users-card").show();
                            noData = $('<div style="text-align: center;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                            <h6>No Data</h6>\
                                            </div>');
                            $("#users-card").html(noData);
                            isKeyEntered = false;
                            $("#filter-users").prop("disabled", false);
                        }

                        var totalRec = getUsers.data.total; //Total getUsees records
                        var pages = Math.ceil((parseInt(getUsers.data.total) / queryTypes.LIMIT)); //No of pages in pagination
                        firstPageObj = getUsers;

                        //Pagination Logic
                        $('.sync-pagination').twbsPagination({
                            totalPages: pages,
                            onPageClick: function (event, page) {
                                offsetUsers = queryTypes.LIMIT * (page - 1);
                                //If offset is greater than total records
                                if (offsetUsers > totalRec)
                                    offsetUsers = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                                //If offset is lesser than total records
                                getUsersHttpRequest(apiType.GET_USERS + "?offset=" + offsetUsers + "&limit=" + queryTypes.LIMIT + "&filter=" + input, page, function (resp) {
                                    //Bind the response using Handlebars
                                    var templateUsers = Handlebars.compile($('#users-cardID').html());
                                    $('#users-card').html(templateUsers(resp.data));
                                    $('#page-loaders-users').hide();
                                });
                            },
                            hideOnlyOnePage: true
                        });
                        isKeyEntered = false;
                        $("#filter-users").prop("disabled", false);
                    });
                }
                else
                    $("#filter-users").prop("disabled", false);

            }
            else if (input.length == 0) {
                isKeyEntered = false;
                $("#filter-users").prop("disabled", false);
             

            }
        }, 1500);

    }

}


getCurrentMeeting = function () {
    $.getJSON('/json/currentmeeting.json', function (response) {
        console.log(response);
        var activityListTemplate = Handlebars.compile($('#activitylistCardId').html());
        $('#currentMeeting').html(activityListTemplate(response.data));
    });
}
getRecntMeeting = function () {
    $.getJSON('/json/recentmeeting.json', function (response) {
        console.log(response);
        var recentMeetingTemplate = Handlebars.compile($('#recentMeetingCardId').html());
        $('#usersmodalrecent').html(recentMeetingTemplate(response.data));
    });
}