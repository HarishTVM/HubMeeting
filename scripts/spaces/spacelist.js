$(document).ready(function () {
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
                    $('#List').html( template(coSpacelist));
                  
                });
            }
        });
    });

    
});