
$(document).ready(function(){
    $('#loginBtn').click(function(){
        window.location.href='/configure';
    })
    
    $('#configureBtn').click(function(){
        window.location.href='/meeting';
    })

    $('#meetingBtn').click(function(){
        window.location.href='/newMeeting';
    })

    $('#activitylist').click(function(){
        window.location.href='/activitylist';
    })
    $('#meetinglist').click(function(){
        window.location.href='/meeting';
    })
 
    $('#users').click(function(){
        window.location.href='/users';
    })
    

    $('#sapacelist').click(function(){
        window.location.href='/sapacelist';
    })

    $('#testbox1').contenthover({
        effect:'slide',
        slide_speed:300,
        overlay_background:'#000',
        overlay_opacity:0.8
    });
    $('#testbox2').contenthover({
        effect:'slide',
        slide_speed:300,
        overlay_background:'#000',
        overlay_opacity:0.8
    });
    $('#testbox2').contenthover({
        effect:'slide',
        slide_speed:300,
        overlay_background:'#000',
        overlay_opacity:0.8
    });


    // $(function() {
    //     $(".rd-navbar-nav li").click(function() {
    //         console.log('clicked')
    //       $(".rd-navbar-nav li").removeClass("activelist");
    //       $(this).addClass("activelist");
    //     });
        
    //   })
});

