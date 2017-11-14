var firstPageObj = null;
var recentSearch, onMembers = "";
var noData, inputSearchMeetingMembers = null;
var loadingModaMembers = $(".loading-moda-members").hide();
var divModaMembers = $(".meeting-members-list");
var btnSearchDiv = $(".input-group").hide();
var meetingID = null;
var iconRefreshPage = $(".noMembersRefreshIcons");
$(document).ready(function () {
    $(".card-loaders-meeting").show();
    $('.loadingPageHide').hide();
    iconRefreshPage.hide();
    var isKeyEntered;
    formatDateAndTimeStatus();
    getMeetingDetails();
    btnSearch();
    // BEGIN UPDATE COSPACE 
    $("#editmodelBtn").on('click', function () {
        window.location.href = "/updatemeeting";
    });
    // END UPDATE COSPACE 
    // BEGIN DELETE MEETING CARDS
    $("#meetingDelBtn").live("click", function () {
        var mainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var ele = $(mainEle).children("#meetingName").attr("meetingName");
        swal({
            title: "",
            text: "Are you sure you want to delete " + ele + " ?",
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
    // END DELETE MEETING CARDS

    // Searh Meeting 
    $('#searhMeeting').keyup(function () {
        searhMeeting(isKeyEntered);
    });

    btnInfoMeetingMoreDetails();
    btnDelete();
});

function getMeetingRequest(query, page, callback) {
    if (page == 0)
        callback(firstPageObj);
    else {
        httpGet(query, function (resp) {
            callback(resp);
        });
    }
}

getMeetingDetails = function () {

    var offset = 0, pages;
    httpGet(apiType.FIND_ALL_MEETING + '?limit=' + queryTypes.LIMIT + '&offset=' + offset, function (resp) {
        var totalRec = resp.data.count; //Total coSpace records
        pages = Math.ceil((parseInt(totalRec) / queryTypes.LIMIT)); //No of pages in pagination
        firstPageObj = resp;

        //Pagination Logic
        $('.sync-pagination').twbsPagination({
            totalPages: pages,
            prev: 'Prev',
            next: 'Next',
            onPageClick: function (event, page) {
                $('.loadingPageHide').hide();
                $('.card-loaders-meeting').show();
                offset = queryTypes.LIMIT * (page - 1);
                //If offset is greater than total records
                if (offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                getMeetingRequest(apiType.FIND_ALL_MEETING + "?limit=" + queryTypes.LIMIT + "&offset=" + offset, page, function (response) {
                    //Bind the response using Handlebars

                    // Set data Append to DefaultLayout for API.
                    for (i = 0; i < response.data.rows.length; i++) {
                        response.data.rows[i].defaultLayout = meetingLayoutTranslation[response.data.rows[i].defaultLayout]
                        // Set data Append to Meeting types for API.
                        response.data.rows[i].meetingType = meetingTypeDetails[response.data.rows[i].meetingType]
                        // Set MeetingStatus for API.
                        response.data.rows[i].meetingStatus = meetingStatusColor[response.data.rows[i].meetingStatus]
                    }

                    response.data.rows.defaultLayout = meetingLayoutTranslation[response.data.rows.defaultLayout]
                    var meetingTemplate = Handlebars.compile($('#meetingCardId').html());
                    $('#meetingCardHandlebars').html(meetingTemplate(response.data));
                    $('.loadingPageHide').show();
                    $('.card-loaders-meeting').hide();
                });
            },
            hideOnlyOnePage: true
        });
    });


}
formatDateAndTimeStatus = function () {
    Handlebars.registerHelper("formatDate", function (dateTime) {
        return moment(dateTime).format('DD/MM/YYYY');
    });
    Handlebars.registerHelper("formatTime", function (dateTime) {
        return moment(dateTime).format('h:mm -A');
    });
}

searhMeeting = function (isKeyEntered) {

    if (!isKeyEntered) {
        isKeyEntered = true;
        setTimeout(function () {

            $("#searhMeeting").prop("disabled", true);
            $('.sync-pagination').empty();
            $('.sync-pagination').removeData("twbs-pagination");
            $('.sync-pagination').unbind("page");

            var offset = 0;
            var input = $('#searhMeeting').val();
            if (input.length > 0) {

                if (recentSearch != input) {
                    recentSearch = input;
                    httpGet(apiType.FIND_ALL_MEETING + '?limit=' + queryTypes.LIMIT + '&offset=' + offset + "&filter=" + input, function (resp) {

                        if (resp.data.count == 0) {
                            $('.page-loaders').hide();

                            noData = $('<div style="text-align: center;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                            <h6>No Data</h6>\
                                            </div>');
                            $("#meetingCardHandlebars").html(noData);
                            isKeyEntered = false;

                            $("#searhMeeting").prop("disabled", false);
                        }

                        var totalRec = resp.data.count; //Total coSpace records
                        var pages = Math.ceil((parseInt(resp.data.count) / queryTypes.LIMIT)); //No of pages in pagination
                        firstPageObj = resp;
                        //Pagination Logic
                        $('.sync-pagination').twbsPagination({
                            totalPages: pages,
                            onPageClick: function (event, page) {
                                $('.loadingPageHide').hide();
                                $('.card-loaders-meeting').show();
                                offset = queryTypes.LIMIT * (page - 1);
                                //If offset is greater than total records
                                if (offset > totalRec)
                                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));

                                getMeetingDetails(apiType.FIND_ALL_MEETING + '?limit=' + queryTypes.LIMIT + '&offset=' + offset + "&filter=" + input, page, function (resp) {

                                    var meetingTemplate = Handlebars.compile($('#meetingCardId').html());
                                    $('#meetingCardHandlebars').html(meetingTemplate(response.data));
                                    $('.loadingPageHide').show();
                                    $('.card-loaders-meeting').hide();
                                    $('.page-loaders').hide();
                                });
                            },
                            hideOnlyOnePage: true
                        });
                        isKeyEntered = false;
                        $("#searhMeeting").prop("disabled", false);
                    });
                }
                else
                    $("#searhMeeting").prop("disabled", false);
            }
            else if (input.length == 0) {
                isKeyEntered = false;
                $("#searhMeeting").prop("disabled", false);
                getMeetingDetails();
            }
        }, 1500);
    }

}

btnInfoMeetingMoreDetails = function () {
    btnSearchDiv.hide();
    $("#infoParent").find("#meetingInfoBtn").live('click', function () {
        loadingModaMembers.show();
        divModaMembers.hide();
        var getMeetingID = $(this).parents("#mainMeetingParent").attr("meetingId");
        var autoPopulateinfoParent = $(this).parents("#infoParent").siblings().html();
        var getMeetingName = $(autoPopulateinfoParent).children("#setMeetingName").attr("setMeetingName");
        $("#modalTitleMeeting").html(getMeetingName);
        meetingID = getMeetingID;
        rquestMeetingMembers();
        btnSearch();
    });
}
btnDelete = function () {

    $("#meetingDelBtn").live("click", function () {
        var getMeetingID = $(this).parents("#mainMeetingParent").attr("meetingId");
        var autoPopulateMeeting = $(this).parents("#infoParent").siblings().html();
        var getMeetingName = $(autoPopulateMeeting).children("#setMeetingName").attr("setMeetingName");

        swal({
            title: "",
            text: "Are you sure you want to delete " + getMeetingName + " ?",
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

}
// BEGIN Rquest To Meeting Members.
rquestMeetingMembers = function () {
    var offset = 0; limit = 10;
    // BEGIN Request To Meeting Members
    setTimeout(function () {
        // BEGIN info Members Send Rquest.
        httpGet(apiType.FIND_ALL_MEETING_MEMBERS + '?limit=' + limit + '&offset=' + offset + "&meetingID=" + meetingID, function (resp) {
            var meetingMembersTemplate = Handlebars.compile($('#meetingMembers').html());
            $('#meetingMembersModal').html(meetingMembersTemplate(resp.data));
            console.log(resp.data)
            divModaMembers.show();
            if (resp.data.count > 5) {
                btnSearchDiv.show();
                iconRefreshPage.hide();
            } else {
                $(".input-group").hide();
            }

        });
        $('.loading-modal').show();
        loadingModaMembers.hide();
    }, 1000);
}
btnSearch = function () {
    var offset = 0; limit = 10;
    $('#btnSearchMembers').click(function () {
        divModaMembers.hide();
        $('.loading-moda-members').show();
        var inputSearchMeetingMembers = $("#inputSearchMeetingMembers").val();
        if (inputSearchMeetingMembers.length > 0) {
            // BEGIN Request To Meeting Members
            setTimeout(function () {
                // BEGIN info Members Send Rquest.
                httpGet(apiType.FIND_ALL_MEETING_MEMBERS + '?limit=' + limit + '&offset=' + offset + "&meetingID=" + meetingID + "&filter=" + inputSearchMeetingMembers, function (resp) {
                    var meetingMembersTemplate = Handlebars.compile($('#meetingMembers').html());
                    $('#meetingMembersModal').html(meetingMembersTemplate(resp.data));
                    console.log(resp.data)
                    divModaMembers.show();

                    if (resp.data.count == 0) {
                        btnSearchDiv.hide();
                        onMembers = $(
                            '<div style="text-align: center; margin-top: 15%;"><a class="linear-icon-user-plus page-error-icon-size"></a>\
                                    <h6>No Members</h6>\
                                    </div>'
                        );
                        $("#meetingMembersModal").html(onMembers);
                        iconRefreshPage.show();
                    } else {
                        var meetingMembersTemplate = Handlebars.compile($('#meetingMembers').html());
                        $('#meetingMembersModal').html(meetingMembersTemplate(resp.data));
                        divModaMembers.show();
                        iconRefreshPage.show();
                    }

                });
                $('.loading-modal').show();
                loadingModaMembers.hide();
            }, 1000);

        } else {
            alert("Please Enter MemberName");
        }
    });
}
// BEGIN RefreshPage icon function
refreshPage = function () {
    divModaMembers.hide();
    $('.loading-moda-members').show();
    rquestMeetingMembers();
}