var firstPageObj = null;
var recentSearch = "";
var noData;
var searchcoSpaceId = null, coSpaceOwnerJid = null, coSpaceNameTitle = null, coSpaceURL = null, totalMembers;
var inputSearchMembers = null;
var isKeyEntered = false;
var headSearchSpaceList= $(".head-search-w-h").hide();
var pagination = $(".sync-pagination");
$(document).ready(function () {
    var isKeyEntered = false;
    $('#page-loaders-users').show();

    $('.loading-modal').hide();
    $('.loading-moda-members').hide();
    $(".input-group").hide()
    $(".noMembersRefreshIcons").hide();
    getCospaces();
    searchSpcelist();
    btnDelete();
    getusersID();
    searchMembers();

    //BEGIN MODAL AUTOPOPULATE IN SPACELIST ON CLICK INFO BTN
    $("#infoDelteBtnsParent").find("#spacelistInfoBtn").live('click', function () {
        debugger;
        var cospaceIdEle = $(this).parents("#mainParent").attr("coSpaceId");

        // var autoPopulate = $(this).parents("#infoDelteBtnsParent").siblings().html();

        // var a = $(autoPopulate).children("#coSpaceName").attr("coSpaceName");
        // $("#modalName").html("<p>SpaceName:&nbsp;</p>" + a);

        // var b = $(autoPopulate).children("#tenant").attr("tenant");
        // $("#modalTenant").html("<p>Tenant:&nbsp;</p>" + b);

        // var c = $(autoPopulate).children("#uri").attr("uri");
        // $("#modalUri").html("<p>Uri:&nbsp;</p>" + c);

        // var d = $(autoPopulate).children("#ownerJid").attr("ownerJid");
        // $("#modalOwnerJid").html("<p>OwnerJid:&nbsp;</p>" + d);

        // BEGIN UPDATE COSPACE 
        $("#modalEditBtn").on('click', function () {
            debugger;
            window.location.href = "/updatespace?cospaceId=" + cospaceIdEle;
        });
        // END UPDATE COSPACE 
    });
    //END MODAL AUTOPOPULATE IN SPACELIST ON CLICK INFO BTN

});
// BEGIN Check GetCoSpacesRequest and Page.
function getCoSpacesRequest(query, page, callback) {

    if (page == 1){
        callback(firstPageObj);
    }
    else {
        headSearchSpaceList.hide();
        httpGet(query, function (resp) {
            callback(resp);
        });
    }
    if (page > 0){
        headSearchSpaceList.show();
    }
}
// BEGIN Get coSpaces for API.
getCospaces = function () {
    $('.card-loaders-spacelist').show();
    $('.page-loaders').show();
    var offset = 0, pages;
    //GET coSpaces records
    httpGet(apiType.GET_COSPACES + '?&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
        var totalRec = resp.data.total; //Total coSpace records
        pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination
        firstPageObj = resp;
        //Pagination Logic
        $('.sync-pagination').twbsPagination({
            totalPages: pages,
            prev: 'Prev',
            next: 'Next',
            onPageClick: function (event, page) {
              
                $('.LoadingPageHide').hide();
                $('.card-loaders-spacelist').show();
                $('.page-loaders').hide();
                if ($('.card-loaders-spacelist').show()) {
                    // $('.bg-white').each(function () {
                    //     this.style.setProperty('background-color', '#f2f2f2', 'important');
                    // });
                }
                offset = queryTypes.LIMIT * (page - 1);
                //If offset is greater than total records
                if (offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                getCoSpacesRequest(apiType.GET_COSPACES + "?offset=" + offset + "&limit=" + queryTypes.LIMIT, page, function (resp) {
                    //Bind the response using Handlebars
                    var template = Handlebars.compile($('#coSpacesUsers').html());
                    $('#List').html(template(resp.data));
                    $("#List").show();
                    pagination.show();
                    $('.card-loaders-spacelist').hide();
                })
          
            },
            hideOnlyOnePage: true
        });
    });

}
// BEGIN GetusersID and Set Modal For API.
getusersID = function () {
    $("#infoDelteBtnsParent").find("#spacelistInfoBtn").live('click', function () {
        $('.loading-modal').show();
        $('.loading-moda-members').show();
        $(".space-details").hide();
        $(".space-members-list").hide();

        var coSpaceId = $(this).parents("#mainParent").attr("coSpaceId");
        var autoPopulate = $(this).parents("#infoDelteBtnsParent").siblings().html();

        var getUsersURL = $(autoPopulate).children("#uri").attr("uri");
        coSpaceNameTitle = $(autoPopulate).children("#coSpaceName").attr("coSpaceName");
        coSpaceURL = $(autoPopulate).children("#uri").attr("uri");
        coSpaceOwnerJid = $(autoPopulate).children("#ownerJid").attr("ownerJid");

        searchcoSpaceId = coSpaceId;
        console.log("coSpaceId" + coSpaceId);

        requestMeetingMembers();

        $("#btnScheduleModal").on('click', function () {
            window.location.href = "/schedulemeeting?cospaceId=" + coSpaceId;
        });

    });

}
// BEGIN Rquest To Spcelist Members.
requestMeetingMembers = function () {
    setTimeout(function () {
        httpGet(apiType.GET_COSPACES_USERS + "?cospaceid=" + searchcoSpaceId, function (resp) {
            console.log(resp);
            var template = Handlebars.compile($('#spaceMembers').html());
            $('#spaceMembersModal').html(template(resp.data.coSpaceUsers));
            totalMembers = resp.data.coSpaceUsers.attrkey.total;
            $("#modalTotalMembers").html(totalMembers);
            $("#modalTitle").html(coSpaceNameTitle);
            $("#modalSpaceID").html(coSpaceNameTitle);
            $("#modalURI").html(coSpaceURL);
            $(".space-details").show();
            $(".space-members-list").show();
            if (totalMembers > 5) {
                $(".input-group").show()
                $(".noMembersRefreshIcons").hide()

            } else {
                $(".input-group").hide()

            }
        });
        $('.loading-modal').hide();
        $('.loading-moda-members').hide();
    }, 1000);

}
// BEGIN Search card Spcelist For API.
searchSpcelist = function () {

    // BEGIN SEARCH FILTER
    $('#filter').keyup(function () {
        $("#List").hide();
        pagination.hide();
        $('.page-loaders').show();
        if (!isKeyEntered) {
            isKeyEntered = true;
            setTimeout(function () {
                $("#filter").prop("disabled", true);
                $('.sync-pagination').empty();
                $('.sync-pagination').removeData("twbs-pagination");
                $('.sync-pagination').unbind("page");

                var offset = 0;
                var input = $('#filter').val();
                if (input.length > 0) {
                   
                    if (recentSearch != input) {
                        recentSearch = input;
                        httpGet(apiType.GET_COSPACES + "?filter=" + input + '&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
                            if (resp.data.total == 0) {
                                $('.page-loaders').hide();
                                noData = $('<div style="text-align: center; margin-top: 5%;"><a class="linear-icon-user-plus page-error-icon-size"></a>\
                                                <h6>No Space</h6>\
                                                </div>');
                                $("#List").html(noData);
                                isKeyEntered = false;
                                $("#List").show();

                                $("#filter").prop("disabled", false);
                            }

                            var totalRec = resp.data.total; //Total coSpace records
                            var pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination
                            firstPageObj = resp;
                            //Pagination Logic
                            $('.sync-pagination').twbsPagination({
                                totalPages: pages,
                                onPageClick: function (event, page) {
                                    offset = queryTypes.LIMIT * (page - 1);
                                    //If offset is greater than total records
                                    if (offset > totalRec)
                                        offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));

                                    getCoSpacesRequest(apiType.GET_COSPACES + "?offset=" + offset + "&limit=" + queryTypes.LIMIT + "&filter=" + input, page, function (resp) {
                                        var template = Handlebars.compile($('#coSpacesUsers').html());
                                        $('#List').html(template(resp.data));
                                        $("#List").show();
                                        $('.page-loaders').hide();
                                    });
                                },
                                hideOnlyOnePage: true
                            });
                            isKeyEntered = false;
                            $("#filter").prop("disabled", false);
                        });
                    }
                    else
                        $("#filter").prop("disabled", false);
                }
                else if (input.length == 0) {
                    isKeyEntered = false;
                    $("#filter").prop("disabled", false);
                    getCospaces();
                }
            }, 1500);
        }
    });
    // END SEARCH FILTER
}
// BEGIN Delete Spcelist For API.
btnDelete = function () {
    // BEGIN DELETE SPACELIST CARDS
    $("#deleteBtn").live("click", function () {
        var mainEle = $(this).parents("#infoDelteBtnsParent").siblings().html();
        var ele = $(mainEle).children("#coSpaceName").attr("coSpaceName");
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
    // END DELETE SPACELIST CARDS
}
// BEGIN Search Members in Modal For API.
searchMembers = function () {
    $('#btnSearchMembers').click(function () {
        inputSearchMembers = $("#inputSearchMembers").val();
        console.log("inputSearchMembers"+inputSearchMembers)
        if(inputSearchMembers.length > 0){
            requestHTTPSearchMembers();
        }else{
            alert("Please Enter MemberName");
        }
    });
}
// BEGIN RefreshPage icon function
refreshPage = function () {
    $('.loading-moda-members').show();
    $(".space-members-list").hide();
    requestMeetingMembers();
}
// BEGIN Search Members Send Rquest.
requestHTTPSearchMembers = function () {
    setTimeout(function () {
        $('.loading-moda-members').show();
        $(".space-members-list").hide();
        console.log(inputSearchMembers);
        httpGet(apiType.GET_COSPACES_USERS + "?cospaceid=" + searchcoSpaceId + "&filter=" + inputSearchMembers, function (resp) {
            var searchTotalMembers = resp.data.coSpaceUsers.attrkey.total;
            if (searchTotalMembers == 0) {
                $('.loading-moda-members').hide();
                onMembers = $(
                    '<div style="text-align: center; margin-top: 15%;"><a class="linear-icon-user-plus page-error-icon-size"></a>\
                            <h6>No Members</h6>\
                            </div>'
                );
                $(".space-members-list").show();
                $("#spaceMembersModal").html(onMembers);
                $(".noMembersRefreshIcons").show()
            } else {
                var template = Handlebars.compile($('#spaceMembers').html());
                $('#spaceMembersModal').html(template(resp.data.coSpaceUsers));
                $(".space-members-list").show();
                $('.loading-moda-members').hide();
                $(".noMembersRefreshIcons").show()
            }
        });
        $(".input-group").hide()
    }, 1000);

}
