
$(document).ready(function(){
    

    $('#loginBtn').click(function(){
        window.location.href='/configure';
    })

    $('#configureBtn').click(function(){
        window.location.href='/meeting';
    })

    $('#meetingBtn').click(function(){
        window.location.href='/newmeeting';
    })



    // $(function() {
    //     $(".rd-navbar-nav li").click(function() {
    //         console.log('clicked')
    //       $(".rd-navbar-nav li").removeClass("activelist");
    //       $(this).addClass("activelist");
    //     });

    //   })
});
