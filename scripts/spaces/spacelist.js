$(document).ready(function(){
    $.getJSON('/jsonFilesSample/spacesJson.json', function(response) {
        console.log(response);
        var source = $('#cardId').html();
        var template = Handlebars.compile(source);
        var result = template(response);
        $('#List').html(result);
    });
});