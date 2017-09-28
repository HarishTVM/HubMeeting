var httpGet = function (Url, callback) {
    $.ajax({
        method: 'GET',
        url: app.BASE_URL + Url,
        success: function (response, status, xhr) {
            callback(response);
        },
        error: function (errObj, xhr, errStr) {
            if(errObj.status == serverStatus.INTERNAL_SERVER_ERROR){
                // TODO Error Toastr
                // FOR Demo To be deleted
                alert(ToastMesssges.INTERNAL_SERVER_ERROR);
            }
            if(errObj.status == serverStatus.PAGE_NOT_FOUND)
                window.location.href = "/404page";
            if(errObj.status == serverStatus.UNAUTHORIZED && (typeof errObj.responseJSON.data != 'undefined') && errObj.responseJSON.data.errorType == errorType.CUSTOM_ERROR)
                callback(null, errObj.responseJSON.data);
            else{
                //TODO Unhandled Error Toastr
            }
        },
    });
};

var httpPost = function (Url, _data, callback) {
    $.ajax({
        method: 'POST',
        url: app.BASE_URL + Url,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        data: _data,
        success: function (data, status, xhr) {
            callback(data);
        },
        error: function (status, xhr) {
            console.log(xhr.status);
        },
    });
};

var httpPut = function (Url, _data, callback) {
    $.ajax({
        method: 'PUT',
        url: app.BASE_URL + Url,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        data: _data,
        success: function (data, status, xhr) {
            callback(data);
        },
        error: function (status, xhr) {
            console.log(xhr.status);
        }
    });
};

var httpDelete = function (Url, _data, callback) {
    $.ajax({
        method: 'DELETE',
        url: app.BASE_URL + Url + '?' + $.param({ "data": _data }),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        success: function (data, status, xhr) {
            callback(data);
        },
        error: function (status, xhr) {
            console.log(xhr.status);
        }
    });
};