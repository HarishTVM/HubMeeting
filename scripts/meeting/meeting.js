$(document).ready(function () {
    // BEGIN NEW MEETING FORM VALIDATION
    $('.done-btn').click(function(){
        debugger;
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });
        }
    });
    // END NEW MEETING FORM VALIDATION
});
