var firstPageObj = null;
var searchUsers = "";
var noData;
$(document).ready(function () {


    $('#page-loaders-users').show();
    $('.div-loaders-users').hide();
    var isKeyEntered = false;

    $('#filter-users').keyup(function () {
        filterUsers(isKeyEntered);
    });

    getUsers();

    // BEGIN DELETE USERS RECENT MEETING CARDS
    $("#recentMeetingDelBtn").live("click", function () {
        debugger;
        var userRecentMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var userRecentEle = $(userRecentMainEle).children("#recentMeetingName").attr("recentMeetingName");
        debugger;
        swal({
            title: "",
            text: "Are you sure you want to delete " + userRecentEle + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function () {
                swal("Deleted!", "", "success");
            });
    });
    // END DELETE USERS RECENT MEETING CARDS

    // BEGIN DELETE USERS ACTIVE MEETING CARDS
    $("#userActiveMeetingDelBtn").live("click", function () {
        var userActiveMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var userActiveEle = $(userActiveMainEle).children("#userActiveMeetingName").attr("userActiveMeetingName");
        debugger;
        swal({
            title: "",
            text: "Are you sure you want to delete " + userActiveEle + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function () {
                swal("Deleted!", "", "success");
            });
    });
    // END DELETE USERS ACTIVE MEETING CARDS

    // BEGIN DELETE USERS SCHEDULE MEETING CARDS
    $("#scheduleMeetingDelBtn").live("click", function () {
        debugger;
        var userScheduleMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var userScheduleEle = $(userScheduleMainEle).children("#scheduleMeetingName").attr("scheduleMeetingName");
        debugger;
        swal({
            title: "",
            text: "Are you sure you want to delete " + userScheduleEle + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function () {
                swal("Deleted!", "", "success");
            });
    });
    // END DELETE USERS SCHEDULE MEETING CARDS

    // BEGIN DELETE USERS CREATED MEETING CARDS
    $("#createdMeetingDelBtn").live("click", function () {
        debugger;
        var userCreatedMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var userCreatedEle = $(userCreatedMainEle).children("#createdMeetingName").attr("createdMeetingName");
        debugger;
        swal({
            title: "",
            text: "Are you sure you want to delete " + userCreatedEle + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function () {
                swal("Deleted!", "", "success");
            });
    });
    // END DELETE USERS CREATED MEETING CARDS

    // BEGIN DELETE USERS EXPIRED MEETING CARDS
    $("#expiredMeetingDelBtn").live("click", function () {
        debugger;
        var userExpiredMainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var userExpiredEle = $(userExpiredMainEle).children("#expiredMeetingName").attr("expiredMeetingName");
        debugger;
        swal({
            title: "",
            text: "Are you sure you want to delete " + userExpiredEle + " ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
            function () {
                swal("Deleted!", "", "success");
            });
    });
    // END DELETE USERS EXPIRED MEETING CARDS
    setSplice();
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

setSplice = function(){

    Handlebars.registerHelper('splitTitle', function() {
        var avatar = substr()
        return t[1] + " <br/> " + t[0];
      });
}
    
getUsers = function () {
    getActiveMeeting();
    getCurrentMeeting();
    getRecntMeeting();
    getSchedulMeeting();
    getcratedMeeting();
    getExpiredMeeting();

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
                $('.LoadingPageHide').hide();
                $('.div-loaders-users').show();
                $('#page-loaders-users').hide();
                if ($('.div-loaders-users').show()) {
                    // $('.bg-white').each(function () {
                    //     this.style.setProperty('background-color', '#f2f2f2', 'important');
                    // });
                }
                offset = queryTypes.LIMIT * (page - 1);
                if (offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                getUsersHttpRequest(apiType.GET_USERS + "?offset=" + offset + "&limit=" + queryTypes.LIMIT, page, function (resp) {
                    //Bind the response using Handlebars
                    $("#users-card").show();
                    $('.LoadingPageHide').show();
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
getSchedulMeeting = function () {
    $.getJSON('/json/schedulmeeting.json', function (response) {
        console.log(response);
        var schedulMeetingTemplate = Handlebars.compile($('#schedulMeetingCardId').html());
        $('#usersmodalschedul').html(schedulMeetingTemplate(response.data));
    });
}
getcratedMeeting = function () {
    $.getJSON('/json/createdmeeting.json', function (response) {
        console.log(response);
        var createdMeetingTemplate = Handlebars.compile($('#createMeetingCardId').html());
        $('#usersmodalcreated').html(createdMeetingTemplate(response.data));
    });
}
getActiveMeeting = function () {
    $.getJSON('/json/meeting.json', function (response) {
        console.log(response);
        var createdMeetingTemplate = Handlebars.compile($('#activeMeetingCardId').html());
        $('#usersmodalactive').html(createdMeetingTemplate(response.data));
    });
}
getExpiredMeeting = function () {
    $.getJSON('/json/expiredmeeting.json', function (response) {
        console.log(response);
        var createdMeetingTemplate = Handlebars.compile($('#expiredMeetingCardId').html());
        $('#usersmodalexpired').html(createdMeetingTemplate(response.data));
    });
}