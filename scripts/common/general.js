
$(document).ready(function () {
    var docElem = window.document.documentElement, didScroll, scrollPosition;
    // Button hover effect for meeting members
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


    // // trick to prevent scrolling when opening/closing button
    // function noScrollFn() {
    //   window.scrollTo(scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0);
    // }
    // function noScroll() {
    //   window.removeEventListener('scroll', scrollHandler);
    //   window.addEventListener('scroll', noScrollFn);
    // }
    // function scrollFn() {
    //   window.addEventListener('scroll', scrollHandler);
    // }
    // function canScroll() {
    //   window.removeEventListener('scroll', noScrollFn);
    //   scrollFn();
    // }
    // function scrollHandler() {
    //   if (!didScroll) {
    //     didScroll = true;
    //     setTimeout(function () { scrollPage(); }, 60);
    //   }
    // };
    // function scrollPage() {
    //   scrollPosition = { x: window.pageXOffset || docElem.scrollLeft, y: window.pageYOffset || docElem.scrollTop };
    //   didScroll = false;
    // };
    // scrollFn();

    // [].slice.call(document.querySelectorAll('.morph-button')).forEach(function (bttn) {
    //   new UIMorphingButton(bttn, {
    //     closeEl: '.linear-icon-cross2',
    //     onBeforeOpen: function () {
    //        // don't allow to scroll
    //           noScroll();
    //         },
    //         onAfterOpen: function () {
    //           // can scroll again
    //           canScroll();
    //         },
    //         onBeforeClose: function () {
    //           // don't allow to scroll
    //           noScroll();
    //         },
    //         onAfterClose: function () {
    //           // can scroll again
    //           canScroll();
    //         }
    //       });
    //     });
    //     // for demo purposes only
    //     [].slice.call(document.querySelectorAll('.actbtn')).forEach(function (bttn) {
    //       bttn.addEventListener('click', function (ev) { ev.preventDefault(); });
    //     });

});

