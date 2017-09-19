$(document).ready(function () {

    var hoverEle = null, isHovered = false;

    $('.child-hidden').hide();
    $('.btn-close ').hide();

    $('.icon-info').click(function () {
        
        if (!isHovered) {
            
       
            $(this).parents('.icons-parents').hide();
            $(this).parents('.parent-div').animate({
                width: 300,
                height: 300,
                top: -50
             }, 'fast');
            $(this).closest('.principale').css({ 'z-index':'1000'});
            $(this).parents('.icons-parents').siblings('.child-hidden').show();
            $(this).parents('.icons-parents').siblings('.parent-close').find('.btn-close ').show();
        
            $(this).siblings('.btn-close ').show();
            hoverEle = $(this).parents('.parent-div');
            isHovered = true;
        }
    });

    $('.btn-close ').click(function () {
       
        if (hoverEle != null) {
        
     
            $(hoverEle).animate({
                height: 160,
                width: 270,
                top: 0    
            }, 'fast');

            $(hoverEle).find('.child-hidden').hide();
            $(this).closest('.principale').css({ 'z-index':'1'});
            $('.parent-div').find('.btn-close ').hide();
            $(hoverEle).find('.icons-parents').show();

            hoverEle = null;
            isHovered = false;
        }
    });

});
