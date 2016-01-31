$(document).ready(function(){
    sessionStorage.setItem("Login","false" );       
    $("#lockScreenLoginBtn").click(function(){        
        var UserName = sessionStorage.getItem("UserName");
        var role = sessionStorage.getItem("Role");
        var pass = $("#lockScreenLoginPassword").val();
        
          $.ajax({
                type: 'POST',
                url : '/api/login/' + UserName,
                success: function(logins) {  
                                       $.each(logins, function(i, login){                                        
                                                if(login.Password == pass)                                                    
                                                    {                                                                                                                                                                   sessionStorage.setItem("Login","true" );                                                                    
                                                      if(role == "Manager"){
                                                               window.location="http://localhost:7000/ManagerDashboard.html";
                                                        }
                                                      if(role == "Admin"){
                                                               window.location="http://localhost:7000/AdminDashboard.html";
                                                        }
                                                      if(role == "Employee"){
                                                               window.location="http://localhost:7000/EmployeeDashboard.html";
                                                        }
                                                    }
                                                  else
                                                    {
                                                   
                                                        setTimeout(function (){                                                    
                                                        $("#lockScreenMessage").css("color","red").text("*Incorrect Password.");                               
                                                         }, 300);   

                                                       setTimeout(function (){
                                                        $("#lockScreenMessage").css("color","red").text("");                                                          
                                                         }, 3000);   
                                                     }
                                                 });
                                                            
                                           },
               error: function(){
                              alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                          }
            });
       });
    
  
               
});


