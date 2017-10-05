$(document).ready(function(){
    var pagesInTotal = 0;
    debugger;
    for(var i=0; i <= pagesInTotal;){
        debugger;
        httpGet(apiType.SPACES_LIST+"?offset="+i+"&limit=10", function(resp){
            console.log(resp.data.coSpaces.attrkey.total/8);
            var pages = Math.ceil(resp.data.coSpaces.attrkey.total/8);
            console.log(pages);
            localStorage.setItem("pageCount",pages);
            $('.sync-pagination').twbsPagination({
                totalPages: pages,
                onPageClick: function (evt, page) {

                }
            });
        });
        i=i+10;
        pagesInTotal = localStorage.getItem("pageCount");
        console.log(parseInt(pagesInTotal));   
    }

});
