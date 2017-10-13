getCospaces = function(){
    debugger;
    var offset = 0, pages;
    //GET coSpaces records
    httpGet(apiType.GET_COSPACES + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
        var totalRec = resp.data.total; //Total coSpace records
        pages = Math.ceil((parseInt(resp.data.total)/queryTypes.LIMIT) + 1); //No of pages in pagination
        //Pagination Logic
        $('.sync-pagination').twbsPagination({
            totalPages: pages,
            hideOnlyOnePage: true,
            onPageClick: function(evnt, page){
                offset = queryTypes.LIMIT * (page - 1);
                //If offset is greater than total records
                if(offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                //If offset is lesser than total records
                httpGet(apiType.GET_COSPACES + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
                    //Bind the response using Handlebars
                    var coSpacelist = resp.data;
                    var source = $('#cardId').html();
                    var template = Handlebars.compile(source);
                    $('#List').html(template(coSpacelist));
                });
            }
        });
    });
}

$(document).ready(function() {
    getCospaces();
    
    // BEGIN SEARCH FILTER
        $('#filter').keyup(function(){
            var input = $('#filter').val();
            httpGet(apiType.GET_COSPACES + "?filter=" + input, function(resp){
                if(input.length > 0){
                    debugger;
                        console.log("Filtered: ", resp);
                        var coSpacelist = resp.data;
                        var source = $('#cardId').html();
                        var template = Handlebars.compile(source);
                        $('#List').html(template(coSpacelist));
                }
                else{
                    debugger;
                    console.log("Not Filtered: ", resp);
                    getCospaces();
                }
            });      
        });
    // END SEARCH FILTER

});