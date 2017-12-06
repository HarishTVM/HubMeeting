var app = {
    BASE_URL: "http://192.168.5.20:9000/api/"
}

var apiType = {
    AUTH_USER: "authenticateUser",
    CHANGE_PASSWORD: "changeUserLoginPassword",
    CONFIGURE: "checkCmsApiUrl",
    GET_COSPACES: "getCospaces",
    CREATE_COSPACE: "createCospace",
    UPDATE_COSCPACE: "updateCospace",
    DELETE_COSPACE_USER: "deleteCospaceUser",
    GET_USERS: "getUsers",
    GET_COSPACES_BY_ID: "getCospacesbyId",
    CHECK_COSPACE_EXISTENCE: "checkCoSpaceExistence",
    GET_COSPACES_USERS: "getCoSpacesUsers",
    CREATE_MEETING: "createMeeting",
    UPDATE_MEETING: "updateMeeting",
    FIND_ALL_MEETING: "findAllMeeting",
    FIND_ALL_MEETING_MEMBERS: "findAllMeetingMembers",
    DELETE_MEETING: "deleteMeeting",
    GET_MEETING_BY_MEETINGID: "getMeetingByMeetingId",
    FIND_ALL_LOGS: "findAllLogs"
}

var errorCodes = {
    // Login
    UNKNOWN_USER: 1,
    PASSWORD_MISMATCH: 2,
    // CONFIGURE API
    API_UNKNOWN_USER: 100,
    // CREATE COSPACE
    BAD_REQUEST: 400
}

var errorType = {
    CUSTOM_ERROR: "CUSTOM_ERROR"
}

var serverStatus = {
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    PAGE_NOT_FOUND: 404,
    BAD_REQUEST: 400
}

var queryTypes = {
    LIMIT: 8
}

var queryTypesActive = {
    LIMIT: 4
}


var ToastMesssges = {
    // Global
    INTERNAL_SERVER_ERROR: "Error occored on Server. Please Contact Administrator.",
    UNHANDLED_ERROR: "Error unhandled.",

    // Login
    UNKNOWN_USER: "Given user name does not exists."

}

var meetingType = {
    Personal: 0,
    OneTime: 1
}

var meetingLayoutTranslation = {
    0: "allEqual",
    1: "speakerOnly",
    2: "telepresence",
    3: "stacked",
    4: "allEqualQuarters",
    5: "allEqualNinths",
    6: "allEqualSixteenths",
    7: "allEqualTwentyFifths",
    8: "onePlusFive",
    9: "onePlusSeven",
    10: "onePlusNine",
    11: "automatic",
    12: "onePlusN"
}

var meetingTypeDetails = {
    0: "Personal",
    1: "OneTime"
}
var meetingStatusColor = {
    0: "#4dffa6",// On going Meeting
    1: "#74a9d8",//Meeting Completed
    2: "#ffff4d",//Meeting to be Started
    3: "#ff4d4d;"//Meeting Expired
}
// var meetingStatusText = {
//     0:"On going Meeting",
//     1:"Meeting Completed",
//     2:"Meeting to be Started",
//     3:"Meeting Expired"
// }

var logType = {
    CREATE_MEETING: 0,
    DELETE_MEETING: 1,
    UPDATE_MEETING: 2,
    CREATE_COSPACE: 3,
    UPDATE_COSPACE: 4,
    ADD_USER_IN_COSPACE: 5,
    DELETE_USER: 6
}