$(document).ready(function () {
    var isModelClosed = true;
    var currentModel = null;
   
    
    $('.content').hide();
    $('#close').hide();

    // $('.contenitore').hover(function() {
    //     $('#close').show();
    //     $(this).find('.content').show();

    //     $(this).animate({
    //         width: 450,
    //         height: 400,
    //         top: -40,
    //         left: 0
    //     }, 'fast');
    //     $(this).animate().css('box-shadow', '50px #fff');
    //     $(this).css({
    //         zIndex: 100
    //     });

    //     $('#close').show();
    //     },function(){

    //         $("#close").click(function(){

    //             $(this).find('.content').hide();
    //             $('.contenitore').animate({
    //                 height: 160,
    //                 width:300,
    //                 top: 0,
    //                 left: 0
    //             }, 'fast');
    //             $('.contenitore').animate().css('box-shadow', 'none');
    //             $('.contenitore').css({
    //                 zIndex: 1
    //     });
    //     $('#close').hide();
    //     $('.content').hide();
    //     }); 
    // });




    // try to naveen BEGIN


    $('.contenitore').hover(function () {
      
        if (isModelClosed) {
            $('#close').show();
            $(this).find('.content').show();
           
            debugger;
            $(this).removeClass('.content');
            $(this).animate({
                width: 450,
                height: 400,
                top: -40,
                left: 0
            }, 'fast');
            $(this).animate().css('box-shadow', '50px #fff');
            $(this).css({
                zIndex: 100
            });
            currentModel = this;
            isModelClosed = false;
        }
    });

    $("#close").click(function () {
        debugger;


        if(currentModel != null){
          //  $(currentModel).addClass('.content');
            $(currentModel).animate({
                height: 160,
                width: 300,
                top: 0,
                left: 0
            }, 'fast');
            $(currentModel).animate().css('box-shadow', 'none');
            $(currentModel).css({
                zIndex: 1
            });
            isModelClosed = true;
            currentModel = null;
        }
    });

    // try to naveen END
});
