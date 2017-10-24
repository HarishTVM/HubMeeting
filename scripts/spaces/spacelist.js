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
            onPageClick: function (event, page) {
                $('.card-loaders-spacelist').show();
                $('.page-loaders').hide();

                if ($('.card-loaders-spacelist').show()) {
                    $('.bg-white').each(function () {
                        this.style.setProperty('background-color', '#f2f2f2', 'important');
                    });
                }
                offset = queryTypes.LIMIT * (page - 1);
                //If offset is greater than total records
                if (offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                getCoSpacesRequest(apiType.GET_COSPACES + "?offset=" + offset + "&limit=" + queryTypes.LIMIT, page, function (resp) {
                    //Bind the response using Handlebars
                    $("#List").show();
                    $('.page-loaders').hide();
                    var template = Handlebars.compile($('#cardId').html());
                    $('#List').html(template(resp.data));
                    $('.card-loaders-spacelist').hide();
                    
                })
            },
            hideOnlyOnePage: true
        });
    });
}

// BEGIN GLOBAL OBJECT FOR AUTOPOPULATING MODAL INSPACELIST PAGE 
 

// END GLOBAL OBJECT FOR AUTOPOPULATING MODAL INSPACELIST PAGE

$(document).ready(function () {
    var isKeyEntered = false;
  
    $('#page-loaders-users').show();
    getCospaces();

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
                    if(recentSearch != input){
                        recentSearch = input;
                        httpGet(apiType.GET_COSPACES + "?filter=" + input + '&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
                            if(resp.data.total == 0){
                                $('.page-loaders').hide();
                                noData = $('<div style="text-align: center;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                                <h6>No Data</h6>\
                                                </div>');
                                $("#List").html(noData);
                                isKeyEntered = false;
                              
                                $("#filter").prop( "disabled", false );
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
                                        var template = Handlebars.compile($('#cardId').html());
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
                    getCospaces();
                }
            }, 1500);
        }
    });
    // END SEARCH FILTER

    //BEGIN MODAL AUTOPOPULATE IN SPACELIST ON CLICK INFO BTN
        $("#infoDelteBtnsParent").find("#spacelistInfoBtn").live('click', function(){
            debugger;
            var autoPopulate = $(this).parents("#infoDelteBtnsParent").siblings().html();
            var a = $(autoPopulate).children("#coSpaceName").attr("coSpaceName");
            $("#modalName").html("<p>SpaceName:&nbsp;</p>" + a);
            var b = $(autoPopulate).children("#tenant").attr("tenant");
            $("#modalTenant").html("<p>Tenant:&nbsp;</p>" + b);
            var c = $(autoPopulate).children("#uri").attr("uri");
            $("#modalUri").html("<p>URI:&nbsp;</p>" + c);
            var d = $(autoPopulate).children("#ownerJid").attr("ownerJid");
            $("#modalOwnerJid").html("<p>OwnerJid:&nbsp;</p>" + d);
        });
    //END MODAL AUTOPOPULATE IN SPACELIST ON CLICK INFO BTN
});