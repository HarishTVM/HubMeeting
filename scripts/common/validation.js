
function validateText(obj){
    var errorEle = $(obj).siblings('.error-text');

    if(typeof $(obj).val() != 'undefined' && $(obj).val() != null && $(obj).val() != ""){
        if(!$(errorEle).hasClass('hide'))
            $(errorEle).addClass('hide')
        return true;
    }
    else{
        if($(errorEle).hasClass('hide'))
            $(errorEle).removeClass('hide')
        return false;
    }
}