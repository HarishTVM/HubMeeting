var httpGet = function (Url, callback) {
    debugger;
    $.ajax({
        method: 'GET',
        url: app.BASE_URL + Url,
        success: function (response, status, xhr) {
            callback(response);
        },
        error: function (errObj, xhr, errStr) {
            if(errObj.status == serverStatus.INTERNAL_SERVER_ERROR){
                {
                 toastr.options.closeButton = true;
                 toastr.warning(ToastMesssges.INTERNAL_SERVER_ERROR);
                }
            }
            if(errObj.status == serverStatus.PAGE_NOT_FOUND)
                window.location.href = "/404page";
            if(errObj.status == serverStatus.UNAUTHORIZED && (typeof errObj.responseJSON.data != 'undefined') && errObj.responseJSON.data.errorType == errorType.CUSTOM_ERROR)
                callback(null, errObj.responseJSON.data);
            else {
                 toastr.options.closeButton = true;
                 toastr.info(ToastMesssges.UNHANDLED_ERROR)
            }
        }
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
        success: function (response, status, xhr) {
            callback(response);
        },
        error: function (errObj, xhr, errStr) {
            console.log(errObj.status);
        },
    });
};

var httpPut = function (Url, _data, callback) {
    debugger;
    $.ajax({
        method: 'PUT',
        url: app.BASE_URL + Url,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        data: _data,
        success: function (response, status, xhr) {
            callback(response);
        },
        error: function (errObj, xhr, errStr){
            if(errObj.status == serverStatus.INTERNAL_SERVER_ERROR){
                {
                    toastr.options.closeButton = true;
                    toastr.warning(ToastMesssges.INTERNAL_SERVER_ERROR);
                }
            }
            if(errObj.status == serverStatus.PAGE_NOT_FOUND)
                window.location.href = '/404page';
        },
    });
};

var httpDelete = function (Url, _data, callback) {
    $.ajax({
        method: 'DELETE',
        url: app.BASE_URL + Url + '?' + $.param({ "data": _data }),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        success: function (response, status, xhr) {
            callback(response);
        },
        error: function (errObj, xhr, errStr) {
            console.log(xhr.status);
        }
    });
};