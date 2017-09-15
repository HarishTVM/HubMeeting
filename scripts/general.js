
<<<<<<< HEAD
$(document).ready(function () {
    $('#loginBtn').click(function () {
        window.location.href = '/configure';
    });
    $('#configureBtn').click(function () {
        window.location.href = '/dashboard';
    });
    $('#meetingBtn').click(function () {
        window.location.href = '/newmeeting';
    });

    $(".btn-warning1").click(function () {

        if ($(this).hasClass("btn-actived")) {
            $(this).removeClass("btn-actived");
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
            $(this).addClass("btn-actived");
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
=======
$(document).ready(function(){
    

    $('#loginBtn').click(function(){
        window.location.href='/configure';
    })

    $('#configureBtn').click(function(){
        window.location.href='/smtp';
    })

    $('#smtpBtn').click(function(){
        window.location.href='/dashboard';
    })

    $('#meetingBtn').click(function(){
        window.location.href='/newmeeting';
    })
>>>>>>> 4f3cf4d68e78a37fc49277dc8ea35580381b8a07

    // $(function() {
    //     $(".rd-navbar-nav li").click(function() {
    //         console.log('clicked')
    //       $(".rd-navbar-nav li").removeClass("activelist");
    //       $(this).addClass("activelist");
    //     });

    //   })
});
