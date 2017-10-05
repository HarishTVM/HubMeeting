var app = {
    BASE_URL:"http://192.168.5.85:9000/api/",
}

var apiType = {
    AUTH_USER:"authenticateUser",
    CHANGE_PASSWORD: "changeUserLoginPassword",
    CONFIGURE: "checkCmsApiUrl",
    SPACES_LIST: "getCospaces"
}

var errorCodes = {
    // Login
    UNKNOWN_USER: 1,
    PASSWORD_MISMATCH: 2,
    //CONFIGURE API
    API_UNKNOWN_USER: 100
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
    UNHANDLED_ERROR: "Error unhandled",

    // Login
    UNKNOWN_USER: "Given user name does not exists."
}