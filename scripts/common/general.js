
$(document).ready(function () {

    // Button hover effect for meeting members
    $(".btn-warning1").click(function () {
        if ($(this).hasClass("btn-actived")) {
            $(this).children().removeClass("h-iconls-color-white");
            if($(this).children().hasClass("linear-icon-camera-crossed")){
                $(this).children().removeClass("linear-icon-camera-crossed");
                $(this).children().addClass("linear-icon-camera");
                $(this).attr("data-original-title", "Hide");
           }
           else if($(this).children().hasClass("linear-icon-mic-mute")){
                $(this).children().removeClass("linear-icon-mic-mute");
                $(this).children().addClass("linear-icon-mic");
                $(this).attr("data-original-title", "Mute");
           }
        }
        else {
            $(this).children().addClass("h-iconls-color-white");
            if($(this).children().hasClass("linear-icon-camera")){
                $(this).children().removeClass("linear-icon-camera");
                $(this).children().addClass("linear-icon-camera-crossed");
                $(this).attr("data-original-title", "Show");
           }
           else if($(this).children().hasClass("linear-icon-mic")){
                $(this).children().removeClass("linear-icon-mic");
                $(this).children().addClass("linear-icon-mic-mute");
                $(this).attr("data-original-title", "Unmute");
           }
        }
        var attr = $(this).attr
    });

});

