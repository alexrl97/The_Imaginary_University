var staff_login_attempts = 3;
var admin_login_attempts = 3;
function check_form_staff()
{
    var name=document.getElementById("staff_username").value;
    var pass=document.getElementById("staff_password").value;
    if(name=="staff" && pass=="staffpw"){
        window.close();
        window.open("staff.html");
    }
    else
    {
        if(staff_login_attempts==0)
        {
            alert("Staff Login Locked");
        }
        else
        {
            staff_login_attempts=staff_login_attempts-1;
            alert("Staff Login Credentials Incorrect! "+staff_login_attempts+" login attempts left");
            if(staff_login_attempts==0)
            {
                document.getElementById("staff_username").disabled=true;
                document.getElementById("staff_username").style.border= "3px solid red";
                document.getElementById("staff_password").disabled=true;
                document.getElementById("staff_password").style.border= "3px solid red";
                document.getElementById("staff_form").disabled=true;
            }
        }
    }

    return false;
}
function check_form_admin()
{
    var name=document.getElementById("admin_username").value;
    var pass=document.getElementById("admin_password").value;
    if(name=="admin" && pass=="adminpw")
    {
        window.close();
        window.open("admin_home.html");
    }
    else
    {
        if(admin_login_attempts==0)
        {
            alert("Admin Login Locked");
        }
        else
        {
            admin_login_attempts=admin_login_attempts-1;
            alert("Admin Login Credentials Incorrect! "+admin_login_attempts+" login attempts left");
            if(admin_login_attempts==0)
            {
                document.getElementById("admin_username").disabled=true;
                document.getElementById("admin_username").style.border= "3px solid red";
                document.getElementById("admin_password").disabled=true;
                document.getElementById("admin_password").style.border= "3px solid red";
                document.getElementById("admin_form").disabled=true;
            }
        }
    }
    return false;
}