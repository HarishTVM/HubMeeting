var firstPageObj = null;
var recentSearch = "";
var noData;
$(document).ready(function () {
    $(".card-loaders-meeting").show();
    $('.loadingPageHide').hide();
    var isKeyEntered;

    formatDateAndTimeStatus();
    getMeetingDetails();

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

    $("#infoParent").find("#meetingInfoBtn").live('click', function () {
        debugger;
        var getMeetingID = $(this).parents("#mainMeetingParent").attr("meetingId");

        var autoPopulateinfoParent = $(this).parents("#infoParent").siblings().html();
        var getMeetingName = $(autoPopulateinfoParent).children("#setMeetingName").attr("setMeetingName");

        var getMeetingStartDate = $(autoPopulateinfoParent).children("#setMeetingStartDate").attr("meetingstartdate");

        // var getTotalMembers = $(autoPopulateinfoParent).children("#setTotalMembers").attr("setTotalMembers");
        // var getDefaultLayout = $(autoPopulateinfoParent).children("#setDefaultLayout").attr("setDefaultLayout");
        // var getMeetingType = $(autoPopulateinfoParent).children("#setMeetingType").attr("setMeetingType");

        console.log(
         "getMeetingName ="+getMeetingName+"\n"+
         "getMeetingStartTime ="+getMeetingStartDate+"\n"+
         "getMeetingID ="+getMeetingID)

         $("#modalTitleMeeting").html(getMeetingName);
    $("#modalStartDate").html(getMeetingStartDate);


  //  $("#modalStartTimeAndEnd").html(getMeetingName);
      //  $("#modalTotalMembers").html(getTotalMembers +"");
     //   $("#modalDefaultLayout").html(efaultLayout);
       // $("#modalMeetingType").html(getMeetingType +"");
        // $("#modalMeetingType").html(getMeetingType);
        // setTimeout(function () {
        //     httpGet(apiType.FIND_ALL_MEETING + '?limit=' + queryTypes.LIMIT + '&offset=' + offset + "&filter=" + getMeetingID, function (resp) {
        //         console.log(resp);
             
        //     });
        //     $('.loading-modal').hide();
        // }, 1000);



    });
    $('.loading-modal').show();
    // $(".space-details").hide();
    // $(".space-members-list").hide();

    // var getMeetingID = $(this).parents("#mainParent").attr("meetingId");
    // var autoPopulate = $(this).parents("#infoDelteBtnsParent").siblings().html();
    // var getMeetingName = $(autoPopulate).children("#setMeetingName").attr("setMeetingNameAttr");

    // var getMeetingStartDate = $(autoPopulate).children("#setMeetingStartDate").attr("setMeetingStartDate");
    // var getMeetingStartTime = $(autoPopulate).children("#setMeetingStartTime").attr("setMeetingStartTime");
    // var getTotalMembers = $(autoPopulate).children("#setTotalMembers").attr("setTotalMembers");
    // var getDefaultLayout = $(autoPopulate).children("#setDefaultLayout").attr("setDefaultLayout");

    // var totalMembers;
    // console.log("getDefaultLayout" + getDefaultLayout + "<br>" + getMeetingStartDate);


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

// Set Localdata for json 
// getMeeting = function () {
//     $.getJSON('/json/meeting.json', function (response) {
//         console.log(response);
//         var meetingTemplate = Handlebars.compile($('#meetingCardId').html());
//         $('#meeting-card').html(meetingTemplate(response.data));

//     });

// }
// meetingModal = function () {
//     $.getJSON('/json/meeting.json', function (response) {
//         console.log(response);
//         var meetingModalTemplate = Handlebars.compile($('#meetingModalId').html());
//         $('#modal').html(meetingModalTemplate(response.data));
//     });
// }