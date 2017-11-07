var firstPageObj = null;
var recentSearch = "";
var noData;
function getCoSpacesRequest(query, page, callback) {
    if (page == 1)
        callback(firstPageObj);
    else {
        httpGet(query, function (resp) {
            callback(resp);
        });
    }
}

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
                    $("#List").show();
                    $('.LoadingPageHide').show();
                    $('.page-loaders').hide();
                    var template = Handlebars.compile($('#coSpacesUsers').html());
                    $('#List').html(template(resp.data));
                    $('.card-loaders-spacelist').hide();

                })
            },
            hideOnlyOnePage: true
        });
    });

}

$(document).ready(function () {
    var isKeyEntered = false;
    $('#page-loaders-users').show();
    $('.loading-modal').hide();
    $(".space-details").hide();
    $(".space-members-list").hide();
    getCospaces();
    GetusersID();
    // BEGIN SEARCH FILTER
    $('#filter').keyup(function () {
        $("#List").hide();
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
                    $("#List").show();
                    if (recentSearch != input) {
                        recentSearch = input;
                        httpGet(apiType.GET_COSPACES + "?filter=" + input + '&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
                            if (resp.data.total == 0) {
                                $('.page-loaders').hide();
                                noData = $('<div style="text-align: center;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                                <h6>No Data</h6>\
                                                </div>');
                                $("#List").html(noData);
                                isKeyEntered = false;

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
                                        $('.page-loaders').hide();
                                        var template = Handlebars.compile($('#coSpacesUsers').html());
                                        $('#List').html(template(resp.data));


                                    })
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

});

// BEGIN GetusersID and Set Modal 
GetusersID = function () {

    $("#infoDelteBtnsParent").find("#spacelistInfoBtn").live('click', function () {
        $('.loading-modal').show();
        
        var coSpaceId = $(this).parents("#mainParent").attr("coSpaceId");
        var autoPopulate = $(this).parents("#infoDelteBtnsParent").siblings().html();

        var getUsersURL = $(autoPopulate).children("#uri").attr("uri");
        var coSpaceNameTitle = $(autoPopulate).children("#coSpaceName").attr("coSpaceName");
        var coSpaceURL = $(autoPopulate).children("#uri").attr("uri");
        var coSpaceOwnerJid = $(autoPopulate).children("#ownerJid").attr("ownerJid");
        
        var keyID = "11979e19-66b1-41f5-9fbf-0f2cb5363922";


        setTimeout(function () {
            $("#coSpaceNameTitle").html(a);
      //      var template = Handlebars.compile($('#coSpacesUser-Modal-Script').html());
            httpGet(apiType.GET_COSPACES_USERS + "?cospaceid=" + keyID ,function (resp) {
                console.log(resp);
        
                $(".space-details").show();
                $(".space-members-list").show();
                

           //   $('.modal-dialog').html(template(resp.data));
                
            });
            $('.loading-modal').hide();

        },1000);

     
        $("#btnScheduleModal").on('click', function () {
            window.location.href = "/schedulemeeting?cospaceId=" + coSpaceId;
        });

    });

  

}
// End GetusersID and Set Modal 