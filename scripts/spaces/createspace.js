$(document).ready(function(){
    $('#btndone').click(function(){
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });
        }
    });

});