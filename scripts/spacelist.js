$(document).ready(function(){
var hoverEle = null, isHovered = false;
    
        $('.child-hidden').hide();
        $('.btn-close ').hide();
    
        $('.icon-info').click(function () {
            
            if (!isHovered) {
                $(this).parents('.icons-parents').hide();
                hoverEle = $(this).parents('.parent-div');
                 $(this).parents('.parent-div').animate({
                    width: 555,
                    height: 300,
                    right: -80,
                    top: -80,
                    left: -45
              
                 }, 'fast');
               
               
                $(this).closest('.principale').css({ 'z-index':'1000'});
                $(this).closest('.link-image').css({'background-color':'#fff'});   
                $(this).parents('.icons-parents').siblings('.child-hidden').show(800);
                $(this).parents('.icons-parents').siblings('.parent-close').find('.btn-close ').show();
                $(this).siblings('.btn-close ').show();
            
                isHovered = true;
    
               
            }
        });
    
        $('.btn-close').click(function () {
           
            if (hoverEle != null) {
                $(hoverEle).animate({
                    height: 160,
                    width: 300,
                    top: 0,
                    left: 0  
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
