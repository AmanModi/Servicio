 $(document).ready(function(){
      sessionStorage.setItem("Login","false"); 
      sessionStorage.setItem("UserName","NULL");
      sessionStorage.setItem("Name","NULL");
      sessionStorage.setItem("Role","NULL");
 $("#loginBtn").click(function () {
    var UserName = $("#loginUserName").val();
    var pass = $("#loginPassword").val();
     var $flag = 1;
    if(UserName=="" || pass==""){
          setTimeout(function (){
            $("#loginMessage").css("color","red").text("*Please fill in Username & Password.");
                sessionStorage.setItem("Login","false"); 
                sessionStorage.setItem("UserName","NULL");
                sessionStorage.setItem("Name","NULL");
                $("#loginBtn").css("backgroundColor","gray").attr('disabled',true);
             }, 300);   

           setTimeout(function (){
            $("#loginMessage").css("color","red").text("");
               $("#loginBtn").css("backgroundColor","#6C496F").attr('disabled',false);
             }, 3000);   
        
    }
     else{
         
    
    $.ajax({
                type: 'POST',
                url : '/api/login/' + UserName,
                success: function(logins) {  
                                       $.each(logins, function(i, login){                                                
                                                $flag = login.IsArchive;
                                                if(login.Password == pass)                                                    
                                                    {
                                                        $.ajax({
                                                            type: 'POST',
                                                            url :'/api/loginsuccess/' + UserName,
                                                            success: function(loginsuccess) {
                                                                $.each(loginsuccess, function(j, loginsuc){                                                      
                                                                    if(typeof(Storage) != "undefined"){                                                            
                                                                        sessionStorage.setItem("UserName",loginsuc.UserName );
                                                                        sessionStorage.setItem("Name",loginsuc.Name );
                                                                        sessionStorage.setItem("Login","true" );
                                                                        sessionStorage.setItem("Role",loginsuc.Role );
                                                                        if(loginsuc.Role == "Manager"){
                                                                            window.location="http://localhost:7000/ManagerDashboard.html";
                                                                        }
                                                                        if(loginsuc.Role == "Admin"){
                                                                            window.location="http://localhost:7000/AdminDashboard.html";
                                                                        }
                                                                        if(loginsuc.Role == "Employee"){
                                                                            window.location="http://localhost:7000/EmployeeDashboard.html";
                                                                        }
                                                                    }
                                                                    else{
                                                                        alert("Sorry, your browser does not support Web Storage.... You are not allowed to log-in. Please download the latest browser.");
                                                                        sessionStorage.setItem("Login","false"); 
                                                                        window.location="http://localhost:7000/index.html";
                                                                    
                                                                    }
                                                                });
                                                            
                                                            },
                                                             error: function(){
                                                                  alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                                                 }
                                                        });
                                                        
                                                    }
                                           
                                            else
                                               {
                                                   
                                                    setTimeout(function (){                                                    
                                                    $("#loginMessage").css("color","red").text("*Incorrect Password.");
                                                        sessionStorage.setItem("Login","false");
                                                        sessionStorage.setItem("UserName","NULL");
                                                        sessionStorage.setItem("Name","NULL");
                                                        $("#loginBtn").css("backgroundColor","gray").attr('disabled',true);
                                                     }, 300);   
                                                   
                                                   setTimeout(function (){
                                                    $("#loginMessage").css("color","red").text("");
                                                       $("#loginBtn").css("backgroundColor","#6C496F").attr('disabled',false);
                                                     }, 5000);   
                                               }
                                                                                     
                    
                                       });
                
                },
           error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
                       
    
              });
     
     
     
     
      if($flag==1)
                                                {
                                                   
                                                    setTimeout(function (){                                                    
                                                    $("#loginMessage").css("color","red").text("*Incorrect UserName.");
                                                        sessionStorage.setItem("Login","false");
                                                        sessionStorage.setItem("UserName","NULL");
                                                        sessionStorage.setItem("Name","NULL");
                                                        $("#loginBtn").css("backgroundColor","gray").attr('disabled',true);
                                                     }, 300);   
                                                   
                                                   setTimeout(function (){
                                                    $("#loginMessage").css("color","red").text("");
                                                       $("#loginBtn").css("backgroundColor","#6C496F").attr('disabled',false);
                                                     }, 3000);   
                                               }
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     }
     
     
     
 });    
 });