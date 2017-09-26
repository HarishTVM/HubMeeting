var BASE_URL = "http://api.routejoot.com/";

    var httpGet = function(Url, callback) {
        debugger;    
        $.ajax({
            method: 'GET',
            url: BASE_URL + Url,
            success: function(response){
                callback(response);
            },
            error: function(response, xhr, status){
                console.log(xhr);
                console.log("Failure");
            },
        });
        // function onSuccess(result){ 
        //     console.log(result);
        // }
    };    
    
    var httpPost = function(Url, _data){
        $.ajax({
            method: 'POST',
            url: Url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: _data,
            success: function(response, xhr, data){
                console.log(xhr.status);
            },
            error: function(response, xhr){
                console.log(xhr.status);
            },
        });
    };
    
    var httpPut = function(Url, _data) {
        $.ajax({
            method: 'PUT',
            url: Url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: _data,
            success: function(response, xhr, data) {
                console.log(xhr.status);
            },
            error: function(response, xhr){
                console.log(xhr.status);
            }
        });
    };

    var httpDelete = function(Url, _data) {
        $.ajax({
            method: 'DELETE',
            url: Url + '?' + $.param({"data": _data}),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            success: function(response, xhr, data) {
                console.log(xhr.status);
            },
            error: function(response, xhr){
                console.log(xhr.status);
            }
        });
    };