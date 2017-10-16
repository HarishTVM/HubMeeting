// getUsers = function(filter){
//     $('#page-loaders').show();
//     var offset = 0, pages, query;
//     var pages = filter;
//     if( fliter == 0){
//         debugger;
//         console.log("fliter")
//     }
//     else{
//         httpGet(apiType.GET_COSPACES + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
//             var totalRec = resp.data.total; //Total coSpace records
//             pages = Math.ceil((parseInt(resp.data.total)/queryTypes.LIMIT) + 1); //No of pages in pagination
//                 //Pagination Logic
//                 $('.sync-pagination').twbsPagination({
//                     totalPages: pages,
//                     hideOnlyOnePage: true,
//                     onPageClick: function(evnt, page){
//                         offset = queryTypes.LIMIT * (page - 1);
//                         //If offset is greater than total records
//                         if(offset > totalRec)
//                             offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
                     
//                     }
                    
                      
//                 });
//             });
// console.log("One")
// }



    

    // query = apiType.GET_USERS + "?offset="+offset+"&limit="+queryTypes.LIMIT;
    // if(typeof fliter != 'undefined' && fliter != null)
    //      query +="&filter=" + filter;
    
    //     //  httpGet(query, function (resp) {
        //         var totalRec = resp.data.total; //Total coSpace records
        //         pages = Math.ceil((parseInt(resp.data.total)/queryTypes.LIMIT) + 1); //No of pages in pagination
        //         //Pagination Logic
        //         /* All fine, proceed with code */
        //         $('.sync-pagination').twbsPagination({
        //             totalPages: pages,
        //             hideOnlyOnePage: true,
        //             onPageClick: function(evnt, page){
        //                 offset = queryTypes.LIMIT * (page - 1);
        //                 //If offset is greater than total records
        //                 if(offset > totalRec)
        //                 offset = totalRec - (totalRec - (queryTypes.LIMIT * (page - 2)));
        //                 //If offset is lesser than total records

        //                 httpGet((typeof filter != 'undefined' && filter != null)?apiType.GET_USERS + "?offset="+offset+"&limit="+queryTypes.LIMIT+"&filter="+filter:apiType.GET_USERS + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
        //                     //Bind the response using Handlebars
        //                     debugger;
        //                     var cardDivUserId = $('#users-cardID').html();
        //                     var handleBarsUserId = Handlebars.compile(cardDivUserId);
        //                     $('#users-card').html(handleBarsUserId(resp.data));
        //                 });
        //             }
                   
        //         });
        //         setTimeout(function(){
        //             $('#page-loaders').hide();
        //         }, 500);
        //     });
        

        getUsers = function(filter){
           
            var offset = 0, pages, query;
            var pages = filter;
           
                 httpGet(apiType.GET_USERS + "?filter=" + filter, function(resp){
                        console.log("Filtered: ", resp);
                        var totalRec = resp.data.total; //Total coSpace records
                        pages = Math.ceil((parseInt(resp.data.total)/queryTypes.LIMIT) + 1); //No of pages in pagination
                   
                        var sou = $('#users-cardID').html();
                        var templ = Handlebars.compile(sou);
                        $('#users-card').html(templ(resp.data));
                    });

            httpGet(apiType.GET_USERS + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
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
                        httpGet(apiType.GET_USERS + "?offset="+offset+"&limit="+queryTypes.LIMIT, function (resp) {
                            //Bind the response using Handlebars
                            var coSpacelist = resp.data;
                            var source = $('#users-cardID').html();
                            var template = Handlebars.compile(source);
                            $('#users-card').html(template(coSpacelist));
                        });
                        setTimeout(function(){
                                        $('#page-loaders').hide();
                                    }, 500);
                    }
                });
            });
        }
    

$(document).ready(function () {
    $('#page-loaders').hide();
    getUsers();

     // BEGIN search for users
    $('#filter-users').keyup(function(){
        getUsers($('#filter-users').val());
    });
// END search for users
});
