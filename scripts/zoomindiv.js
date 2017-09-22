var origWidth;
$(document).ready(function () {
    origWidth = $(window).outerWidth();
    console.log("Original Width: ", origWidth);
    // $(window).resize(function(){
    //     var curWidth = $(window).width();
    //     var balWidth = curWidth - origWidth;
    //     console.log("Current Width: ", curWidth);
    //     console.log("Balance Width: ", balWidth);
    // });
    var hoverEle = null, isHovered = false;

    $('.child-hidden').hide();
    $('.btn-close ').hide();

    $(window).resize(function(){
        var curWidthNew = $(window).outerWidth();
        console.log("Current Width: ", curWidthNew);
        $('.icon-info').click(function () {
            console.log("Half of Current Width: ", curWidthNew/2);
            var curCardWidth = $(this).parents('.parent-div').width();
            console.log("Current card width: ", curCardWidth);
            var elePos = $(this).parents('.parent-div').offset();
            console.log(elePos);
            console.log("Top: " + elePos.top + " Left: " + elePos.left);
            debugger;
            var parentEle = $(this).parents('.parent-div');
            var wid = $(window).width()/2;
            var hei = $(window).height()/2;
            
            var top = ((($(window).height() - hei) / 2) + $(window).scrollTop() / 2) / 2 * -1 + "px";
            var left = (((($(window).width() - wid) / 2) + $(window).scrollLeft()) ) * -1 + "px";

 //           if(elePos.left > curWidthNew/2) {
                if (!isHovered) {
                    $(this).parents('.icons-parents').hide();
                    hoverEle = $(this).parents('.parent-div');
                    $(this).parents('.parent-div').animate({
                        width: wid,
                        height: hei,
                        top: top,
                        left: left
                    }, 'fast');
                    // $(this).parents('.parent-div').css('right', '100%').css('right', '-=200px');
                    $(this).closest('.principale').css({ 'z-index':'1000'},{'background-color':'red !important'});   
                    $(this).closest('.link-image').css({'background-color':'#fff'});   
                    $(this).parents('.icons-parents').siblings('.child-hidden').show(800);
                    $(this).parents('.icons-parents').siblings('.parent-close').find('.btn-close ').show();
                    $(this).siblings('.btn-close ').show();
                
                    isHovered = true;
                }
            // }
            // else {
            //     if (!isHovered) {
            //         $(this).parents('.icons-parents').hide();
            //         hoverEle = $(this).parents('.parent-div');

            //         $(this).parents('.parent-div').animate({
            //             width: wid,
            //             height: hei,
            //             top: top,
            //             left: left
            //         }, 'fast');
            //         // $(this).parents('.parent-div').css('left', '100%').css('left', '+=150px');
            //         $(this).closest('.principale').css({ 'z-index':'1000'},{'background-color':'red !important'});   
            //         $(this).closest('.link-image').css({'background-color':'#fff'});   
            //         $(this).parents('.icons-parents').siblings('.child-hidden').show(800);
            //         $(this).parents('.icons-parents').siblings('.parent-close').find('.btn-close ').show();
            //         $(this).siblings('.btn-close ').show();
                
            //         isHovered = true;
            //     }
            // }
    });
});

    $('.btn-close').click(function () {
       
        if (hoverEle != null) {
            $(hoverEle).animate({
                height: 160,
                width: 300,
                top: 0,
                left: 0,
                right: 0
            }, 'fast');

           $(hoverEle).find('.child-hidden').hide();
            $(this).closest('.principale').css({ 'z-index':'0'});
            $('.parent-div').find('.btn-close ').hide();
            $(this).closest('.link-image').css({'background-color':'#eee'});   
            $(hoverEle).find('.icons-parents').show();
            
            hoverEle = null;
            isHovered = false;
        }
    });

});
