$(document).ready(function(){
    console.log(localStorage.getItem("userID"));
    $('#saveBtn').click(function(){
        var iscpformvalid = false;
        var isnewpwdvaild = false;
        var isconfirmpwdvalid = false;

        var newpwd = $('#new-password').val();
        var confirmpwd = $('#c-password').val();

        if(newpwd == ""){
            isnewpwdvaild = false;
        }
        else{
            isnewpwdvaild = true;
        }
        if(confirmpwd == ""){
            isconfirmpwdvalid = false;
        }
        else{
            isconfirmpwdvalid = true;
        }

        if(isnewpwdvaild == true && isconfirmpwdvalid == true){
            iscpformvalid = true;
        }

        if(iscpformvalid == true){
            if(newpwd === confirmpwd){

                httpPut('changeUserLoginPassword', )
            }
            else{
                alert("passwords mismatch..!");
            }
        }
        else{
            alert("Please enter valid details in the form fields");
        }
    });
});