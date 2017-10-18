var firstPageObj = null;
var recentSearch = "";

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
                offset = queryTypes.LIMIT * (page - 1);
                //If offset is greater than total records
                if (offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                getCoSpacesRequest(apiType.GET_COSPACES + "?offset=" + offset + "&limit=" + queryTypes.LIMIT, page, function (resp) {
                    //Bind the response using Handlebars
                    var template = Handlebars.compile($('#cardId').html());
                    $('#List').html(template(resp.data));
                })
            },
            hideOnlyOnePage: true
        });
    });
}

$(document).ready(function () {
    var isKeyEntered = false;
    getCospaces();

    // BEGIN SEARCH FILTER
    $('#filter').keyup(function () {
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
                    if(recentSearch != input){
                        recentSearch = input;
                        httpGet(apiType.GET_COSPACES + "?filter=" + input + '&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
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
            }, 10000);
        }
    });
    // END SEARCH FILTER

});