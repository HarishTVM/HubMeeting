$(document).ready(function () {
    $('#page-loaders-users').show();
    $('.div-loaders-users').hide();
    $('.usersNoData').hide();

    var isKeyEntered = false;
    getUsersHttp();
    $('#filter-users').keyup(function () {
        filterUsers(isKeyEntered);
    });
});

getUsersHttp = function () {

    var offsetUsers = 0, pages;
    $('.div-loaders-users').show();
    $('#page-loaders-users').show();
    //GET coSpaces records
    httpGet(apiType.GET_USERS, function (resp) {
        var totalRec = resp.data.total; //Total coSpace records
        pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination
        //Pagination Logic
        $('.sync-pagination').twbsPagination({
            totalPages: pages,
            onPageClick: function (event, page) {
                $('.div-loaders-users').show();
                $('#page-loaders-users').hide();
                if ($('.div-loaders-users').show()) {
                    $('.bg-white').each(function () {
                        this.style.setProperty('background-color', '#f2f2f2', 'important');
                    });
                }

                offsetUsers = queryTypes.LIMIT * (page - 1);
                if (offsetUsers > totalRec)
                    offsetUsers = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                httpGet(apiType.GET_USERS + "?offset=" + offsetUsers + "&limit=" + queryTypes.LIMIT, function (resp) {
                    //Bind the response using Handlebars

                    var sourceUsers = $('#users-cardID').html();
                    var templateUsers = Handlebars.compile(sourceUsers);
                    $('#users-card').html(templateUsers(resp.data));
                    $('.div-loaders-users').hide();
                    $('#page-loaders-users').hide();
                    if ($('.card-icon-size')) {
                        setIconcolor();
                    }
                });
            },
            hideOnlyOnePage: true
        });
    });
}

filterUsers = function (isKeyEntered) {

    if (!isKeyEntered) {
        isKeyEntered = true;
        setTimeout(function () {
            $("#filter-users").prop("disabled", true);
            $('.sync-pagination').empty();
            $('.sync-pagination').removeData("twbs-pagination");
            $('.sync-pagination').unbind("page");

            var offset = 0;
            var input = $('#filter-users').val();
            if (input.length > 0) {
                httpGet(apiType.GET_USERS + "?filter=" + input + '&offset=' + offset + '&limit=' + queryTypes.LIMIT, function (resp) {
                    var totalRec = resp.data.total; //Total coSpace records
                    var pages = Math.ceil((parseInt(resp.data.total) / queryTypes.LIMIT)); //No of pages in pagination

                    if (resp.data.total == 0) {
                        var noData = $('<div style="text-align: center;"><a class="linear-icon-sad page-error-icon-size"></a>\
                                        <h6>No Data</h6>\
                                        </div>');
                        $("#users-card").html(noData);
                        isKeyEntered = false;
                        $("#filter-users").prop("disabled", false);
                    }

                    //Pagination Logic
                    $('.sync-pagination').twbsPagination({
                        totalPages: pages,
                        onPageClick: function (event, page) {
                            offsetUsers = queryTypes.LIMIT * (page - 1);
                            //If offset is greater than total records
                            if (offsetUsers > totalRec)
                                offsetUsers = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                            //If offset is lesser than total records
                            httpGet(apiType.GET_USERS + "?offset=" + offsetUsers + "&limit=" + queryTypes.LIMIT + "&filter=" + input, function (resp) {
                                //Bind the response using Handlebars
                                var sourceUsers = $('#users-cardID').html();
                                var templateUsers = Handlebars.compile(sourceUsers);
                                $('#users-card').html(templateUsers(resp.data));
                            });
                        },
                        hideOnlyOnePage: true
                    });
                    isKeyEntered = false;
                    $("#filter-users").prop("disabled", false);
                });
            }
            else if (input.length == 0) {
                isKeyEntered = false;
                getUsersHttp();
            }
        }, 1500);
    }

}

setIconcolor = function () {
    var colorIcons;

    $.getJSON('/json/color.json', function (response) {

        var res = response;


        $('.card-icon-size').each(function (resq) {
            console.log(resq)

            for (var i = 0; i < resq.data.colors.length; i++) {
                console.log("colorIcons:" + resq.data.colors[i].color);
                this.style.setProperty('color', res.data.colors[i].color, 'important');

                // $('.card-icon-size').css('color', res.data.colors[i].color ,'important');
            }
        });



        // console.log("outside-loop"+colorIcons);


    });




}