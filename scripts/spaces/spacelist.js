$(document).ready(function () {
    debugger;
    var totalRecords = 0;
    for (var i = 0; i <= totalRecords;) {
        httpGet(apiType.SPACES_LIST + "?offset=" + i + "&limit=8", function (resp) {
            var records = resp.data.coSpaces.attrkey.total;
            localStorage.setItem("recordCount", records);
            // console.log("Total Pages: ", records / 8);
            var pages = Math.ceil(records / 8);
            // console.log("Pages: ", pages);
            //Pagination logic
            $('.sync-pagination').twbsPagination({
                totalPages: pages,
                hideOnlyOnePage: true,
                onPageClick: function (evt, page) {
                    debugger;
                    var list = resp.data.coSpaces.coSpace;
                    console.log(list.slice(i))
                }
            });
        });
        totalRecords = localStorage.getItem("recordCount");
        console.log(totalRecords);
        i=i+8;
    }
});
