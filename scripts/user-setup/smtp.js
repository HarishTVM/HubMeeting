$(document).ready(function(){
    $('#smtpBtn').click(function(){
        $("#page-loader").show();
        if($('form').hasClass('validate-form')){
            var resultItem = [];
            $('.validate-text').each(function(i, obj){
                resultItem.push(validateText(obj));
            });

            if(resultItem.indexOf(false) < 0){
                
            }
        }
    });
});