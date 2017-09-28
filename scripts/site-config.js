var app = {
    BASE_URL:"http://localhost:9000/api/",
}

var apiType = {
    AUTH_USER:"authenticateUser"
}

var errorCodes = {
    // Login
    UNKNOWN_USER:1
}

var errorType = {
    CUSTOM_ERROR:"CUSTOM_ERROR"
}

var serverStatus = {
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    PAGE_NOT_FOUND: 404
}

var ToastMesssges = {
    // Global
    INTERNAL_SERVER_ERROR:"Error occored on Server. Please Contact Administrator.",

    // Login
    UNKNOWN_USER: "Given user name does not exists."
}