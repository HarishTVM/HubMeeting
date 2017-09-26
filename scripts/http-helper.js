var BASE_URL = "http://api.routejoot.com/";
    
    var httpGet = function(Url, callback) {
        $.ajax({
            method: 'GET',
            url: BASE_URL + Url,
            success: function(data, status, xhr){
                callback(data);
                // callback(xhr.status);
            },
            error: function(status, xhr){
                console.log(xhr.status);
                console.log("Failure");
            },
        });
    };    
    
    var httpPost = function(Url, _data, callback){
        $.ajax({
            method: 'POST',
            url: Url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: _data,
            success: function(data, status, xhr){
                callback(data);
            },
            error: function(status, xhr){
                console.log(xhr.status);
            },
        });
    };
    
    var httpPut = function(Url, _data, callback) {
        $.ajax({
            method: 'PUT',
            url: Url,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: _data,
            success: function(data, status, xhr) {
                callback(data);
            },
            error: function(status, xhr){
                console.log(xhr.status);
            }
        });
    };

    var httpDelete = function(Url, _data, callback) {
        $.ajax({
            method: 'DELETE',
            url: Url + '?' + $.param({"data": _data}),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            success: function(data, status, xhr) {
                callback(data);
            },
            error: function(status, xhr){
                console.log(xhr.status);
            }
        });
    };