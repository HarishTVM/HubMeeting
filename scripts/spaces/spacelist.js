getCospaces = function () {

    $('.card-loaders-spacelist').show();
    $('.page-loaders').show();
    var offset = 0, pages;
    //GET coSpaces records
    httpGet(apiType.GET_COSPACES, function (resp) {
        var totalRec = resp.data.total; //Total coSpace records
        pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination
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
                //If offset is lesser than total records
                httpGet(apiType.GET_COSPACES + "?offset=" + offset + "&limit=" + queryTypes.LIMIT, function(resp) {
                    //Bind the response using Handlebars
                    var coSpacelist = resp.data;
                    var source = $('#cardId').html();
                    var template = Handlebars.compile(source);
                    $('#List').html(template(coSpacelist));
                    $('.card-loaders-spacelist').hide();
                    $('.page-loaders').hide();
                });
            },
            hideOnlyOnePage: true
        });
    });
}

$(document).ready(function () {

  
    var isKeyEntered = false;
    getCospaces();

    // BEGIN SEARCH FILTER
        $('#filter').keyup(function(){
            if(!isKeyEntered){
                isKeyEntered = true;
                setTimeout(function(){
                    $("#filter").prop( "disabled", true );
                    debugger;
                    $('.sync-pagination').empty();
                    $('.sync-pagination').removeData("twbs-pagination");
                    $('.sync-pagination').unbind("page");
        
                    var offset = 0;
                    var input = $('#filter').val();
                    if(input.length > 0){
                            httpGet(apiType.GET_COSPACES + "?filter=" + input + '&offset='+ offset + '&limit='+ queryTypes.LIMIT, function(resp){
                                debugger;
                                if(resp.data.total == 0){
                                    var noData = $('<div style="text-align: center;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                                    <h6>No Data</h6>\
                                                    </div>');
                                    $("#List").html(noData);
                                    isKeyEntered = false;
                                    $("#filter").prop( "disabled", false );
                                }
                                var totalRec = resp.data.total; //Total coSpace records
                                var pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination
                                //Pagination Logic
                                $('.sync-pagination').twbsPagination({
                                    totalPages: pages,
                                    onPageClick: function (event, page) {
                                    debugger;
                                    offset = queryTypes.LIMIT * (page - 1);
                                        //If offset is greater than total records
                                        if (offset > totalRec)
                                            offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                                        //If offset is lesser than total records
                                        httpGet(apiType.GET_COSPACES + "?offset=" + offset + "&limit=" + queryTypes.LIMIT + "&filter=" + input, function(resp) {
                                            //Bind the response using Handlebars
                                            var coSpacelist = resp.data;
                                            var source = $('#cardId').html();
                                            var template = Handlebars.compile(source);
                                            $('#List').html(template(coSpacelist));
                                        });
                                    },
                                    hideOnlyOnePage: true
                                });
                                isKeyEntered = false;
                                $("#filter").prop( "disabled", false );  
                        });
                    }     
                    else if(input.length == 0){
                        debugger;
                        isKeyEntered = false;
                        $("#filter").prop( "disabled", false );
                        getCospaces();
                        }
                    }, 1500);
            }  
        });
    // END SEARCH FILTER
});