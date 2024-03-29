var firstPageObj = null;
var recentSearch, onMembers = "";
var noData, inputSearchMeetingMembers = null;
var loadingModaMembers = $(".loading-moda-members").hide();
var divModaMembers = $(".meeting-members-list");
var btnSearchDiv = $(".input-group").hide();
var meetingID = null;
var iconRefreshPage = $(".noMembersRefreshIcons");
var meetingDetailsDiv = $(".meeting-details");
var loadingModalDetails = $(".loading-modal");
var meetingCardDiv = $(".meeting-card-div");
var pageLoadersMeeting = $("#page-loaders-meeting");
var headSearch = $(".head-search-w-h");
var isKeyEntered = false;
$(document).ready(function () {
    $(".card-loaders-meeting").show();
    $('.loadingPageHide').hide();
    iconRefreshPage.hide();
    headSearch.hide();
    formatDateAndTimeStatus();
    getMeetingDetails();
    btnSearch();
    searhMeeting();
    // BEGIN UPDATE COSPACE 
    $("#editmodelBtn").on('click', function () {
        window.location.href = "/updatemeeting?meetingID=" + meetingID;
        
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
    if (page > 1) {
        headSearch.show();
    } else {
        headSearch.hide();
    }
}
// BEGIN Rquest To Find All Meeting.
getMeetingDetails = function () {
    $('.card-loaders-spacelist').show();
    $('.page-loaders').show();

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
                    meetingCardDiv.show();
                    pageLoadersMeeting.hide()

                });
            },
            hideOnlyOnePage: true
        });
    });


}
// BEGIN Converter Date,Time Format for Card meeting.
formatDateAndTimeStatus = function () {
    Handlebars.registerHelper("formatDate", function (dateTime) {
        return moment(dateTime).format('DD/MM/YYYY');
    });
    Handlebars.registerHelper("formatTime", function (dateTime) {
        return moment(dateTime).format('h:mm -A');
    });
}
// BEGIN Searh Meeting for Card.
searhMeeting = function () {

    // Searh Meeting 
    $('#searhMeeting').keyup(function () {
        meetingCardDiv.hide();
        pageLoadersMeeting.show();
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
                            meetingCardDiv.hide();
                            if (resp.data.count == 0) {
                                $('.page-loaders').hide();

                                noData = $('<div style="text-align: center; margin-top: 5%;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                                <h6>No Meething</h6>\
                                                </div>');
                                $("#meetingCardHandlebars").html(noData);
                                isKeyEntered = false;
                                meetingCardDiv.show();
                                pageLoadersMeeting.hide();
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

                                    getMeetingRequest(apiType.FIND_ALL_MEETING + '?limit=' + queryTypes.LIMIT + '&offset=' + offset + "&filter=" + input, page, function (resp) {

                                        var meetingTemplate = Handlebars.compile($('#meetingCardId').html());
                                        $('#meetingCardHandlebars').html(meetingTemplate(resp.data)); debugger;
                                        $('.loadingPageHide').show();
                                        $('.card-loaders-meeting').hide();
                                        $('.page-loaders').hide();
                                        pageLoadersMeeting.hide();
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
    });

}
// BEGIN info Icon onClick GetDetails for Card.
btnInfoMeetingMoreDetails = function () {
    $("#infoParent").find("#meetingInfoBtn").live('click', function () {
        btnSearchDiv.hide();
        meetingDetailsDiv.hide();
        loadingModalDetails.show();
        loadingModaMembers.show();
        divModaMembers.hide();
        var getMeetingID = $(this).parents("#mainMeetingParent").attr("meetingId");
        var autoPopulateinfoParent = $(this).parents("#infoParent").siblings().html();
        var getMeetingName = $(autoPopulateinfoParent).children("#setMeetingName").attr("setMeetingName");
        $("#modalTitleMeeting").html(getMeetingName);

        meetingID = getMeetingID;
        rquestMeetingMembers();
        btnSearch();
        rquestToInfoDetails();
    });
}
// BEGIN Rquest To Delete Meeting.
btnDelete = function () {
    var meetingIDget = "";
    var meetingNameGet = "";
    $("#meetingDelBtn").live("click", function () {
        var getMeetingID = $(this).parents("#mainMeetingParent").attr("meetingId");
        var autoPopulateMeeting = $(this).parents("#infoParent").siblings().html();
        var getMeetingName = $(autoPopulateMeeting).children("#setMeetingName").attr("setMeetingName");
        meetingIDget = getMeetingID;
        meetingNameGet = getMeetingName;
    });

    $("#yesMeetingDelBtn").click(function () {
        httpDelete(apiType.DELETE_MEETING + "?meetingID=" + meetingIDget, function (resp, err) {
            if (err) {
                if (err.customErrCode == errorCodes.UNKNOWN_USER) {
                    toastr.options.closeButton = true;
                    toastr.error(err.message);
                }
                else if (err.customErrCode == errorCodes.BAD_REQUEST) {
                    toastr.options.closeButton = true;
                    toastr.warning("UnrecognisedObject");
                }
            }
            else {
                swal(meetingNameGet, "Deleted!", "success");
            }
            setTimeout(function () { location.reload(); }, 2000);
        });
    });
    $("#noMeetingDelBtn").click(function () {
        $('#delModal').modal('hide');
    });
}
// END Rquest To Delete Meeting.

// BEGIN Rquest To Meeting Members.
rquestMeetingMembers = function () {
    // BEGIN Request To Meeting Members
    setTimeout(function () {
        // BEGIN info Members Send Rquest.
        httpGet(apiType.FIND_ALL_MEETING_MEMBERS + '?limit=10' + '&offset=0' + "&meetingID=" + meetingID, function (resp) {
            var meetingMembersTemplate = Handlebars.compile($('#meetingMembers').html());
            $('#meetingMembersModal').html(meetingMembersTemplate(resp.data));
            divModaMembers.show();
            meetingDetailsDiv.show();
            loadingModalDetails.hide();
            if (resp.data.count > 5) {
                btnSearchDiv.show();
                iconRefreshPage.hide();
            } else {
                $(".input-group").hide();
            }

        });
        loadingModaMembers.hide();
    }, 1000);
}
btnSearch = function () {
    $('#btnSearchMembers').click(function () {
        divModaMembers.hide();
        $('.loading-moda-members').show();
        var inputSearchMeetingMembers = $("#inputSearchMeetingMembers").val();
        if (inputSearchMeetingMembers.length > 0) {
            // BEGIN Request To Meeting Members
            setTimeout(function () {
                // BEGIN info Members Send Rquest.
                httpGet(apiType.FIND_ALL_MEETING_MEMBERS + '?limit=10' + '&offset=0' + "&meetingID=" + meetingID + "&filter=" + inputSearchMeetingMembers, function (resp) {
                    var meetingMembersTemplate = Handlebars.compile($('#meetingMembers').html());
                    $('#meetingMembersModal').html(meetingMembersTemplate(resp.data));
    
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
                loadingModaMembers.hide();
            }, 1000);

        } else {
            divModaMembers.show();
            $('.loading-moda-members').hide();
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
// BEGIN Rquest To info Details 
rquestToInfoDetails = function () {

    setTimeout(function () {
        // BEGIN info Members Send Rquest.
        httpGet(apiType.GET_MEETING_BY_MEETINGID + "?meetingID=" + meetingID, function (resp) {

            // Set data Append to DefaultLayout for API.
            resp.data.defaultLayout = meetingLayoutTranslation[resp.data.defaultLayout];
            resp.data.meetingType = meetingTypeDetails[resp.data.meetingType];

            var meetingDetailsTemplate = Handlebars.compile($('#meetingDetails').html());
            $('#meetingDetailsModal').html(meetingDetailsTemplate(resp));
            divModaMembers.show();
            loadingModalDetails.hide();
        });
        loadingModaMembers.hide();
    }, 1000);
}