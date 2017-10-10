$(document).ready(function () {
    var offset = 0, pages;
    httpGet(apiType.GET_COSPACES + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
        var totalRec = resp.data.total;
        pages = Math.ceil((parseInt(resp.data.total)/queryTypes.LIMIT) + 1);
        $('.sync-pagination').twbsPagination({
            totalPages:pages,
            hideOnlyOnePage: true,
            onPageClick: function(evnt, page){
                debugger;
                offset = queryTypes.LIMIT * (page - 1);
                if(offset > totalRec)
                    offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                httpGet(apiType.GET_COSPACES + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
            
                })
            }
        })
    })

    // for (var i = 0; i <= totalRecords;) {
    //     httpGet(apiType.GET_COSPACES + "?offset=" + i + "&limit=8", function (resp) {
    //         debugger;
    //         var records = resp.data.total;
    //         localStorage.setItem("recordCount", records);
    //         // console.log("Total Pages: ", records / 8);
    //         var pages = Math.ceil(records / 8);
    //         // console.log("Pages: ", pages);
    //         //Pagination logic
    //         $('.sync-pagination').twbsPagination({
    //             totalPages: pages,
    //             hideOnlyOnePage: true,
    //             onPageClick: function (evt, page) {
    //                 debugger;
    //                 var coSpacelist = resp.data.coSpaces;
    //                 var source = $('#cardId').html();
    //                 var template = Handlebars.compile(source);
    //                 $('#List').html( template(coSpacelist));
    //                 console.log(coSpacelist);
    //             }
    //         });
    //     });
    //     totalRecords = localStorage.getItem("recordCount");
    //     console.log(totalRecords);
    //     i=i+8;
    // }
});