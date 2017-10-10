$(document).ready(function () {
    debugger;
    var totalRecords = 0;
    for (var i = 0; i <= totalRecords;) {
        httpGet(apiType.GET_COSPACES + "?offset=" + i + "&limit=8", function (resp) {
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
                    var coSpacelist = resp.data.coSpaces;
                    var source = $('#cardId').html();
                    var template = Handlebars.compile(source);
                    $('#List').html( template(coSpacelist));
                    console.log(coSpacelist);
                }
            });
        });
        totalRecords = localStorage.getItem("recordCount");
        console.log(totalRecords);
        i=i+8;
    }
});