$(document).ready(function(){
    $("#nameX").text(sessionStorage.getItem("Name"));  
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
////////////////////////////////////////////////////////////////USER///////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
    

var $viewAllUserTableBody = $('#viewAllUserTableBody');   

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////ADD USER//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    

    
$( '#addUserBtn' ).click(function() {  
    var user =  $("#UserName").val();
    var flag = 0;
    var newUser = {
		Name: $('#Name').val(),
        Sex: $('#Sex').val(),
        DOB: $('#DOB').val(),
        Address: $('#Address').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Mobile: $('#Mobile').val(),
        Email: $('#Email').val(),
        Role: $('#Role').val(),
        UserName: $('#UserName').val(),
        Password: $('#Password').val()
	};
    
    $.ajax({
                type: 'GET',
                url :'/api/allusernames',
                success: function(allusernames) {                                           
	                                       $.each(allusernames, function(i, ausername){                                               
                                                if(ausername.UserName==user)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
    
    setTimeout(function (){        
        if(flag == 1){
            $("#userAdded").css("color","red").text("*UserName is Already Taken. Please use another UserName."); 
            setTimeout(function (){
            $("#userAdded").css("color","red").text(""); 
            }, 3000); 
        }
        else{
            $.ajax({
            type: 'POST',
            url: '/api/user',
            data: newUser,
            success: function(){
                $("#userAdded").css("color","#37bc9b").text("*New User has been Added..!"); 
                $("#addUserBtn").css("backgroundColor","gray").attr('disabled',true);
                setTimeout(function (){
                    $("#userAdded").text(""); 
                    $("#addUserBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
                 }, 5000); 
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

        });
       }
     }, 200); 
});
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////ASSIGN MANAGER////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    
    
$("#assignManagerModalBtn").click(function(){
      $("#addRelationMessage").css("color","#37bc9b").text(""); 
      $("#assignManagerBtn").css("backgroundColor","#37bc9b").attr('disabled',false);  
      var $aman="";
      var $aman1="";
      $('#managerAssignEmployee').empty();
      $('#managerAssignManager').empty();
       $.ajax({
                type: 'GET',
                url :'/api/usersidbyrole/Employee',
                success: function(employees) {                                           
	                                       $.each(employees, function(i, employee){
                                               var $uID = employee.U_ID;
                                             $aman +=  '<option data-id='+ $uID +'><td>' 
                                                        + employee.Name + "(" + employee.UserName + ")"
                                                  '</option>';	  
                                          });
                   $('#managerAssignEmployee').append($aman);
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
    
        $.ajax({
                    type: 'GET',
                    url :'/api/usersidbyrole/Manager',
                    success: function(managers) {                                           
                                               $.each(managers, function(i, manager){
                                                   var $uID = manager.U_ID;
                                                 $aman1 +=  '<option data-id='+ $uID +'><td>' 
                                                            + manager.Name + "(" + manager.UserName + ")"
                                                      '</option>';	  
                                              });
                       $('#managerAssignManager').append($aman1);
                                            },
                    error: function(){
                                              alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                     }

                  }); 
    
      
  });
    
    $("#assignManagerBtn").click(function(){         
        var newRelation = {
		E_ID: $('#managerAssignEmployee option:selected').attr('data-id'),
        M_ID: $('#managerAssignManager option:selected').attr('data-id')
        };
        
        $.ajax({
                    type: 'PUT',
                    url :'/api/relationdelete/' + $("#managerAssignEmployee option:selected").attr('data-id'),
                    success: function() {    
                        
                        
                                         $.ajax({
                                                type: 'POST',
                                                url: '/api/relation',
                                                data: newRelation,
                                                success: function(){
                                                    $("#addRelationMessage").css("color","#37bc9b").text("*New Relation has been Added..!"); 
                                                    $("#assignManagerBtn").css("backgroundColor","gray").attr('disabled',true);               
                                                },

                                                error: function(){
                                                            alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                                                 }

                                            });
                        
                        
                                               
                                            },
                    error: function(){
                                              alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                     }

                  }); 
    
        
        
    });
    
    
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////UPDATE USER///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
var user;
    
    $("#updateUserBtn").click(function(){
    user =  $("#uName").val();
    var flag = 0;
      if(user =="")
      {
          $("#userUpdate").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
          $("#updateUserBtn").css("backgroundColor","gray").attr('disabled',true);
      }
      else{          
          $.ajax({
                type: 'GET',
                url :'/api/allusernames',
                success: function(allusernames) {                                           
	                                       $.each(allusernames, function(i, ausername){                                               
                                                if(ausername.UserName==user)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                    
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
          
          setTimeout(function (){
              
              if(flag == 1){
                  $("#userUpdate").css("color","#37bc9b").text("*Please Click on 'Open Update Form Button' to proceed further."); 
                  $("#updateUserBtn").css("backgroundColor","gray").attr('disabled',true);
                  $("#userUpdateFormBtn").css("backgroundColor","#37bc9b").attr('disabled',false);  
                  $("#uName").attr('disabled',true);
              }   

             if(flag == 0){
                $("#userUpdate").css("color","red").text("*Incorrect UserName. Click on Reset & Try again."); 
                $("#updateUserBtn").css("backgroundColor","gray").attr('disabled',true);
                 }

         }, 300);      
      }  
  });
     $("#updateUserResetBtn").click(function(){          
            $("#userUpdate").text("");  
          $("#updateUserBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
         $("#userUpdateFormBtn").css("backgroundColor","Gray").attr('disabled',true);
         $("#uName").attr('disabled',false);
    
  });
    
    
    $("#updateUserModalBtn").click(function(){        
        $("#userUpdateFormBtn").css("backgroundColor","Gray").attr('disabled',true);
        $("#updateUserBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
        $("#userUpdate").text("");  
       
    });
    
    

    $("#userUpdateFormBtn").click(function(){
        
        $("#userUpdate").text(""); 
        $("#updateParticularUser")[0].reset();
        $("#updateParticularUserForm")[0].reset();
        $("#updateUserModal").modal('hide');
        $("#updateUserDetailsFormModal").modal('show');
        
        $("#userUpdateFormBtn").css("backgroundColor","Gray").attr('disabled',true);
        
           
                $.ajax({
                    type: 'GET',
                    url :'/api/userbyusername/' + user,
                    success: function(userInfos) {
                        $.each(userInfos, function(i, userInfo){    
                        
                                                    $('#updateName').val(userInfo.Name);                                                    
                                                    $('#updateAddress').val(userInfo.Address);
                                                    $('#updateCity').val(userInfo.City);
                                                    $('#updateState').val(userInfo.State);
                                                    $('#updateMobile').val(userInfo.Mobile);
                                                    $('#updateEmail').val(userInfo.Email);
                                                    $('#updateRole').val(userInfo.Role); 
                                                });

                                                },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
        
    });
    
    
    
    

    $( '#finalUpdateUserBtn' ).click(function() {     
    var updateUser = {
		Name: $('#updateName').val(),        
        Address: $('#updateAddress').val(),
        City: $('#updateCity').val(),
        State: $('#updateState').val(),
        Mobile: $('#updateMobile').val(),
        Email: $('#updateEmail').val(),
        Role: $('#updateRole').val(),        
	};
    
        $.ajax({
            type: 'PUT',
            url: '/api/userupdate/' + user,
            data: updateUser,
            success: function(){
                $("#finaluserUpdate").css("color","#37bc9b").text("*User has been updated Successfully..!"); 
                $("#finalUpdateUserBtn").css("backgroundColor","gray").attr('disabled',true);                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

        });
    });
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////VIEW USER//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
////////////////////////////////////////////////////////////VIEW PARTICULAR USER/////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  $("#viewParticularUserBtn").click(function(){
    var user =  $("#viewParticularUserUserName").val();
    var flag = 0;
      if(user =="")
      {
          $("#wrongUserName").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
          $("#viewParticularUserBtn").css("backgroundColor","gray").attr('disabled',true);
      }
      else{          
          $.ajax({
                type: 'GET',
                url :'/api/allusernames',
                success: function(allusernames) {                                           
	                                       $.each(allusernames, function(i, ausername){                                               
                                                if(ausername.UserName==user)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                    
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
          
          setTimeout(function (){
              
              if(flag == 1){
                var $aman;   
                $.ajax({
                    type: 'GET',
                    url :'/api/userbyusername/' + user,
                    success: function(viewroleusers) {
                                               $('#viewUserModal').modal('hide');
                                               $('#userByUserNameDetail').empty();
                                               $('#usernameDetailModal').modal('show');
                                               $.each(viewroleusers, function(i, eachuser){                                       

                                            $aman +=  '<tr><th>NAME</th><td>' 
                                                            + eachuser.Name + 
                                                      '</td><tr/><tr><th>USERNAME</th><td>'
                                                            + eachuser.UserName +
                                                      '</td><tr/><tr><th>SEX</th><td>'
                                                            + eachuser.Sex + 
                                                      '</td><tr/><tr><th>Date of Birth</th><td>'
                                                            + eachuser.DOB.split(' ')[0] +
                                                      '</td><tr/><tr><th>AGE</th><td>'
                                                            + eachuser.Age +
                                                      '</td><tr/><tr><th>ADDRESS</th><td>'
                                                            + eachuser.Address +
                                                      '</td><tr/><tr><th>CITY</th><td>'
                                                            + eachuser.City +
                                                      '</td><tr/><tr><th>STATE</th><td>'
                                                            + eachuser.State +
                                                      '</td><tr/><tr><th>MOBILE</th><td>'
                                                            + eachuser.Mobile +
                                                      '</td><tr/><tr><th>EMAIL</th><td>'
                                                            + eachuser.Email +
                                                      '</td><tr/><tr><th>ROLE</th><td>'
                                                            + eachuser.Role +
                                                  '</td></tr>';	
                                                    });                    
                        $('#userByUserNameDetail').append($aman);

                                                    },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
              }

             if(flag == 0){
                $("#wrongUserName").css("color","red").text("*Incorrect UserName. Click on Reset & Try again."); 
                $("#viewParticularUserBtn").css("backgroundColor","gray").attr('disabled',true);
                 }

         }, 300);         
      }  
  });
     $("#viewParticularUserBtnReset").click(function(){          
            $("#wrongUserName").text("");  
          $("#viewParticularUserBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
    
  });
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    
/////////////////////////////////////////////////////////////////*VIEW USERS BASED ON ROLE */////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
$("#viewRoleUserBtn").on('click', function(){
     var $aman;
     var role =  $("#userRole").val(); 
     $('#viewAllUserByRoleTableBody').empty();
     $("#viewAllUserByRoleTable").show(); 
   
        $.ajax({
                type: 'GET',
                url :'/api/usersbyrole/' + role,
                success: function(viewroleusers) {
                                           $("#tableModal").show();
	                                       $.each(viewroleusers, function(i, eachuser){
                                            var $uName = eachuser.UserName;
		                                  /* $viewAllUserTableBody.append(  */
                                                $aman +=  '<tr data-id='+ $uName +'><td>' 
                                                        + eachuser.Name + 
                                                  '</td><td>'
                                                        + eachuser.Sex + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                  '</td><td>'
                                                        + eachuser.Age +
                                                  '</td><td>'
                                                       // + eachuser.Address +
                                                 // '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                        + eachuser.Email +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewAllUserByRoleTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  

 });
    
    
$('#viewRoleUserBtnReset').on('click',function(){	
   
    $("#viewAllUserByRoleTable").hide();
    
     });
    
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
       
/////////////////////////////////////////////////////////////////*VIEW ALL USERS */////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
$("#viewAllUserBtn").on('click', function(){
     var $aman;     
     $('#viewAllUserTableBody').empty();
     $("#viewAllUserTable").show();
   // $("#viewAllUserBtn").css("backgroundColor","gray").attr('disabled',true);
        $.ajax({
                type: 'GET',
                url :'/api/user',
                success: function(viewallusers) {
                                           $("#tableModal").show();
	                                       $.each(viewallusers, function(i, eachuser){
                                               var $uName = eachuser.UserName;
		                                  
                                                $aman +=  '<tr data-id='+ $uName +'><td>' 
                                                        + eachuser.Name + 
                                                  '</td><td>'
                                                        + eachuser.Sex + 
                                                  '</td><td>'
                                               //         + eachuser.DOB +
                                                 // '</td><td>'
                                                        + eachuser.Age +
                                                  '</td><td>'
                                                /*        + eachuser.Address +
                                                  '</td><td>'
                                                        + eachuser.City +
                                                  '</td><td>'
                                                        + eachuser.State +
                                                  '</td><td>'
                                                        + eachuser.Mobile +
                                                  '</td><td>'*/
                                                        + eachuser.Email +
                                                  '</td><td>'
                                                        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewAllUserTableBody').append($aman);
                                        
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  

 });
    

$('#viewAllUserBtnReset').on('click',function(){
   
    $("#viewAllUserTable").hide();
    $("#viewAllUserBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
     });
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
 ///////////////////////////////////////////////////////////////////EMPTY OUT THE MODALS ON CLOSE///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $('#closeTableModal').on('click',function(){
        $('#viewAllUserTableBody').empty();
        $('#viewAllCompanyTableBody').empty();
        $('#viewAllUserByRoleTableBody').empty();
        $("#viewAllUserByRoleTable").hide();
        $("#viewAllUserTable").hide();
         $("#viewAllCompanyTable").hide();
    });
    
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
///////////////////////////////////////////////////////////////////SHOW COMPLETE USER DETAILS/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    $('.userTables #viewAllUserTable').on('click','tbody tr',function(){       
        
        var $aman;   
        $.ajax({
                type: 'GET',
                url :'/api/userbyusername/' + $(this).attr('data-id'),
                success: function(viewroleusers) {
                                           $('#tableModal').modal('hide');
                                           $('#completeUserDetail').empty();
                                           $('#completeUserDetailModal').modal('show');
	                                       $.each(viewroleusers, function(i, eachuser){                                       
		                                  
                                        $aman +=  '<tr><th>NAME</th><td>' 
                                                        + eachuser.Name + 
                                                  '</td><tr/><tr><th>USERNAME</th><td>'
                                                        + eachuser.UserName +
                                                  '</td><tr/><tr><th>SEX</th><td>'
                                                        + eachuser.Sex + 
                                                  '</td><tr/><tr><th>Date of Birth</th><td>'
                                                        + eachuser.DOB.split(' ')[0] +
                                                  '</td><tr/><tr><th>AGE</th><td>'
                                                        + eachuser.Age +
                                                  '</td><tr/><tr><th>ADDRESS</th><td>'
                                                        + eachuser.Address +
                                                  '</td><tr/><tr><th>CITY</th><td>'
                                                        + eachuser.City +
                                                  '</td><tr/><tr><th>STATE</th><td>'
                                                        + eachuser.State +
                                                  '</td><tr/><tr><th>MOBILE</th><td>'
                                                        + eachuser.Mobile +
                                                  '</td><tr/><tr><th>EMAIL</th><td>'
                                                        + eachuser.Email +
                                                  '</td><tr/><tr><th>ROLE</th><td>'
                                                        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    
                    $('#completeUserDetail').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  
        
    
    
    });   
    
    
     $('.userTables #viewAllUserByRoleTable').on('click','tbody tr',function(){       
        
        var $aman;   
        $.ajax({
                type: 'GET',
                url :'/api/userbyusername/' + $(this).attr('data-id'),
                success: function(viewroleusers) {
                                           $('#tableModal').modal('hide');
                                           $('#completeUserDetail').empty();
                                           $('#completeUserDetailModal').modal('show');
	                                       $.each(viewroleusers, function(i, eachuser){                                       
		                                  
                                        $aman +=  '<tr><th>NAME</th><td>' 
                                                        + eachuser.Name + 
                                                  '</td><tr/><tr><th>USERNAME</th><td>'
                                                        + eachuser.UserName +
                                                  '</td><tr/><tr><th>SEX</th><td>'
                                                        + eachuser.Sex + 
                                                  '</td><tr/><tr><th>Date of Birth</th><td>'
                                                        + eachuser.DOB.split(' ')[0] +
                                                  '</td><tr/><tr><th>AGE</th><td>'
                                                        + eachuser.Age +
                                                  '</td><tr/><tr><th>ADDRESS</th><td>'
                                                        + eachuser.Address +
                                                  '</td><tr/><tr><th>CITY</th><td>'
                                                        + eachuser.City +
                                                  '</td><tr/><tr><th>STATE</th><td>'
                                                        + eachuser.State +
                                                  '</td><tr/><tr><th>MOBILE</th><td>'
                                                        + eachuser.Mobile +
                                                  '</td><tr/><tr><th>EMAIL</th><td>'
                                                        + eachuser.Email +
                                                  '</td><tr/><tr><th>ROLE</th><td>'
                                                        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    
                    $('#completeUserDetail').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  
        
    
    
    });   

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
                                                                            
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////DELETE USER////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
   
$("#deleteParticularUserBtn").click(function(){
    var user =  $("#deleteParticularUserUserName").val();
    var flag = 0;
      if(user =="")
      {
          $("#wrongUserNameDelete").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
          $("#deleteParticularUserBtn").css("backgroundColor","gray").attr('disabled',true);
      }
      else{          
          $.ajax({
                type: 'GET',
                url :'/api/allusernames',
                success: function(allusernames) {                                           
	                                       $.each(allusernames, function(i, ausername){                                               
                                                if(ausername.UserName==user)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }                  
                                                });
                    
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
          
          setTimeout(function (){
              
              if(flag == 1){
                var $aman;   
                $.ajax({
                    type: 'PUT',
                    url :'/api/userdelete/' + user,
                    success: function() {
                                $("#wrongUserNameDelete").css("color","#37bc9b").text("*User has been Removed."); 
                                $("#deleteParticularUserBtn").css("backgroundColor","gray").attr('disabled',true);
                                        },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
              }

             if(flag == 0){
                $("#wrongUserNameDelete").css("color","red").text("*Incorrect UserName. Click on Reset & Try again."); 
                $("#deleteParticularUserBtn").css("backgroundColor","gray").attr('disabled',true);
                 }

         }, 300);         
      }  
  });
     $("#deleteParticularUserBtnReset").click(function(){          
            $("#wrongUserNameDelete").text("");  
          $("#deleteParticularUserBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
    
  });
    
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////COMPANY/////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////ADD COMPANY///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    
  $("#addCompanyModalBtn").click(function(){
      var $aman="";
      $('#companyClient').empty();
       $.ajax({
                type: 'GET',
                url :'/api/usersidbyrole/client',
                success: function(clients) {                                           
	                                       $.each(clients, function(i, client){
                                               var $uID = client.U_ID;
                                             $aman +=  '<option data-id='+ $uID +'><td>' 
                                                        + client.Name + "(" + client.UserName + ")"
                                                  '</option>';	  
                                          });
                   $('#companyClient').append($aman);
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
    
      
  });
    
    
$("#addCompanyModalBtn").click(function() {  
        $("#addCompany")[0].reset();    
        $("#addCompanyMessage").css("color","#37bc9b").text(""); 
        $("#addCompanyBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
});
    
    
$("#addCompanyBtn").click(function() {  
    var company =  $("#companyName").val();    
    var flag = 0;    
    var newCompany = {
		CompanyName: $('#companyName').val(),        
        City: $('#companyCity').val(),
        U_ID: $('#companyClient :selected').attr('data-id')        
	};
    
    
    $.ajax({
                type: 'GET',
                url :'/api/companyname/',
                success: function(allcompanynames) {                                           
	                                       $.each(allcompanynames, function(i, acompanyname){                                               
                                                if(acompanyname.CompanyName==company)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
    
    setTimeout(function (){        
        if(flag == 1){
            $("#addCompanyMessage").css("color","red").text("*This Company is already registered."); 
            setTimeout(function (){
            $("#addCompanyMessage").css("color","red").text(""); 
            }, 3000); 
        }
        else{
            $.ajax({
            type: 'POST',
            url: '/api/company',
            data: newCompany,
            success: function(){
                $("#addCompanyMessage").css("color","#37bc9b").text("*New Company has been Added..!"); 
                $("#addCompanyBtn").css("backgroundColor","gray").attr('disabled',true);               
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

        });
       }
     }, 200); 
});
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////UPDATE COMPANY///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
var company;
    
    $("#updateCompanyBtn").click(function(){
    company =  $("#updateCompanyName").val();
    var flag = 0;
      if(company =="")
      {
          $("#updateCompanyMessage").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
          $("#updateCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
      }
      else{          
          $.ajax({
                type: 'GET',
                url :'/api/companyname/',
                success: function(allcompanynames) {                                           
	                                       $.each(allcompanynames, function(i, acompanyname){                                               
                                                if(acompanyname.CompanyName==company)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
          
          setTimeout(function (){
              
              if(flag == 1){
                  $("#updateCompanyMessage").css("color","#37bc9b").text("*Please Click on 'Open Update Form Button' to proceed further."); 
                  $("#updateCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
                  $("#updateCompanyFormBtn").css("backgroundColor","#37bc9b").attr('disabled',false);  
                  $("#updateCompanyName").attr('disabled',true);
              }

             if(flag == 0){
                $("#updateCompanyMessage").css("color","red").text("*Incorrect Company Name. Click on Reset & Try again."); 
                $("#updateCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
                 }

         }, 300);         
      }  
  });
     
    
     $("#updateCompanyFormResetBtn").click(function(){          
         $("#updateCompanyMessage").text("");  
         $("#updateCompanyBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
         $("#updateCompanyFormBtn").css("backgroundColor","Gray").attr('disabled',true);
         $("#updateCompanyName").attr('disabled',false);
    
  });
    
    $("#updateCompanyModalBtn").click(function(){
        $('#updateCompanyClient').empty();
        $("#updateCompanyFormBtn").css("backgroundColor","Gray").attr('disabled',true);
        $("#updateCompanyBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
        $("#updateCompanyName").attr('disabled',false);
        $("#updateCompanyMessage").text("");  
       
    });
    
   
    $("#updateCompanyFormBtn").click(function(){
         var $aman="";
        $("#companyUpdate").text(""); 
        $("#updateCompany")[0].reset();
        $("#updateParticularCompany")[0].reset();
        $("#updateCompanyModal").modal('hide');
        $("#updateCompanyDetailsFormModal").modal('show');
        $("#updateCompanyFormBtn").css("backgroundColor","Gray").attr('disabled',true);
        $("#finalCompanyUpdateBtn").css("backgroundColor","#37bc9b").attr('disabled',false);   
        
                 $.ajax({
                        type: 'GET',
                        url :'/api/usersidbyrole/client',
                        success: function(clients) {                                           
                                                   $.each(clients, function(i, client){
                                                       var $uID = client.U_ID;
                                                     $aman +=  '<option id='+ $uID +'><td>' 
                                                                + client.Name + "(" + client.UserName + ")"
                                                          '</option>';	  
                                                  });
                           $('#updateCompanyClient').append($aman);
                            
                                                },
                        error: function(){
                                                  alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                         }

                      }); 
           
                $.ajax({
                    type: 'GET',
                    url :'/api/company/' + company,
                    success: function(companyInfos) {
                        $.each(companyInfos, function(i, companyInfo){                        
                                                    $('#updateCompanyName1').val(companyInfo.CompanyName);                                          
                                                    $('#updateCompanyCity').val(companyInfo.City);
                                                    var y = companyInfo.U_ID;
                                                    var x;                                                    
                                                    $("#updateCompanyClient option").each(function () {

                                                        if (($(this).val($(this).attr("id")).attr("id")) == y) {
                                                            x = ($(this).val($(this).attr("id")).text());
                                                        }

                                                    });
                                                    
                                                    $("#updateCompanyClient option:contains(" + x + ")").attr('selected', 'selected');

                                                });

                                                },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
        
    });
    
    
     $( '#finalCompanyUpdateBtn' ).click(function() {     
     var updateCompany = {
		CompanyName: $('#updateCompanyName1').val(),        
        City: $('#updateCompanyCity').val(),
        U_ID: $('#updateCompanyClient :selected').attr('id')        
	};
    
        $.ajax({
            type: 'PUT',
            url: '/api/companyupdate/' + company,
            data: updateCompany,
            success: function(x){
                $("#companyUpdate").css("color","#37bc9b").text("*Company has been updated Successfully..!"); 
                $("#finalCompanyUpdateBtn").css("backgroundColor","gray").attr('disabled',true);                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

        });
    });
    
    

    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////VIEW COMPANY//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
////////////////////////////////////////////////////////////VIEW PARTICULAR COMPANY/////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  $("#viewParticularCompanyBtn").click(function(){      
    var company =  $("#viewParticularCompanyCompanyName").val();
    var flag = 0;
      if(company =="")
      {
          $("#viewCompanyMessage").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
          $("#viewParticularCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
      }
      else{          
          $.ajax({
                type: 'GET',
                url :'/api/allcompanynames',
                success: function(allcompanynames) {                                           
	                                       $.each(allcompanynames, function(i, acompanyname){                                               
                                                if(acompanyname.CompanyName==company)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                    
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
          
          setTimeout(function (){
              
              if(flag == 1){
                var $aman="";   
                $.ajax({
                    type: 'GET',
                    url :'/api/companydetail/' + company,
                    success: function(viewrcompanydetails) {
                                               $('#viewCompanyModal').modal('hide');
                                               $('#companyByCompanyNameDetail').empty();
                                               $('#companynameDetailModal').modal('show');
                                               $.each(viewrcompanydetails, function(i, viewrcompanydetail){                                                        
                                                   
                                            $aman +=  '<tr><th>COMPANY NAME</th><td>' 
                                                            + viewrcompanydetail.CompanyName + 
                                                      '</td><tr/><tr><th>CITY</th><td>'
                                                            + viewrcompanydetail.City +
                                                      '</td><tr/><tr><th>NAME of CLIENT</th><td>'
                                                            + viewrcompanydetail.Name + 
                                                      '</td><tr/><tr><th>AGE</th><td>' 
                                                            + viewrcompanydetail.Age +
                                                      '</td><tr/><tr><th>SEX</th><td>' 
                                                            + viewrcompanydetail.Sex +
                                                      '</td><tr/><tr><th>CLIENT CITY</th><td>'
                                                            + viewrcompanydetail.City +
                                                      '</td><tr/><tr><th>STATE</th><td>'
                                                            + viewrcompanydetail.State +
                                                      '</td><tr/><tr><th>MOBILE</th><td>'
                                                            + viewrcompanydetail.Mobile + 
                                                      '</td><tr/><tr><th> EMAIL</th><td>'
                                                            + viewrcompanydetail.Email +                                                     
                                                  '</td></tr>';	
                                                    });                         
                        $('#companyByCompanyNameDetail').append($aman);

                                                    },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
              }

             if(flag == 0){
                $("#viewCompanyMessage").css("color","red").text("*Incorrect CompanyName. Click on Reset & Try again."); 
                $("#viewParticularCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
                 }

         }, 300);         
      }  
  });
    
     $("#viewParticularCompanyResetBtn").click(function(){         
            $("#viewCompanyMessage").text("");  
          $("#viewParticularCompanyBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
    
  });
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
/////////////////////////////////////////////////////////////////*VIEW ALL COMPANIES */////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
$("#viewAllCompanyBtn").on('click', function(){
     var $aman;     
     $('#viewAllCompanyTableBody').empty();
     $("#viewAllCompanyTable").show();
   // $("#viewAllUserBtn").css("backgroundColor","gray").attr('disabled',true);
        $.ajax({
                type: 'GET',
                url :'/api/company',
                success: function(viewallcompanies) {
                                           $("#tableModal").show();
                    
	                                       $.each(viewallcompanies, function(i, eachcompany){
                                               var $cName = eachcompany.CompanyName;
		                                  
                                                $aman +=  '<tr data-id='+ $cName +'><td>'  
                                                                + eachcompany.CompanyName + 
                                                          '</td><td>' 
                                                                + eachcompany.City + 
                                                          '</td><td>'                                              
                                                                + eachcompany.Name +                                                 
                                                          '</td></tr>';	
                                                });
                    $('#viewAllCompanyTableBody').append($aman);
                                        
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  

 });
    

$('#viewAllCompanyBtnReset').on('click',function(){
   
    $("#viewAllCompanyTable").hide();
    $("#viewAllCompanyBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
     });
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    
///////////////////////////////////////////////////////////////////SHOW COMPLETE COMPANY DETAILS/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    $('.userTables #viewAllCompanyTable').on('click','tbody tr',function(){       
        
        var $aman;   
        $.ajax({
                type: 'GET',
                url :'/api/companydetail/' + $(this).attr('data-id'),
                success: function(viewcompanydetails) {
                                           $('#tableModal').modal('hide');
                                           $('#completeCompanyDetail').empty();
                                           $('#completeCompanyDetailModal').modal('show');
	                                       $.each(viewcompanydetails, function(i, viewcompanydetail){                                       
		                                 
                                        $aman +=      '<tr><th>COMPANY NAME</th><td>' 
                                                            + viewcompanydetail.CompanyName + 
                                                      '</td><tr/><tr><th>CITY</th><td>'
                                                            + viewcompanydetail.City +
                                                      '</td><tr/><tr><th>NAME of CLIENT</th><td>'
                                                            + viewcompanydetail.Name + 
                                                      '</td><tr/><tr><th>AGE</th><td>' 
                                                            + viewcompanydetail.Age +
                                                      '</td><tr/><tr><th>SEX</th><td>' 
                                                            + viewcompanydetail.Sex +
                                                      '</td><tr/><tr><th>CLIENT CITY</th><td>'
                                                            + viewcompanydetail.City +
                                                      '</td><tr/><tr><th>STATE</th><td>'
                                                            + viewcompanydetail.State +
                                                      '</td><tr/><tr><th>MOBILE</th><td>'
                                                            + viewcompanydetail.Mobile + 
                                                      '</td><tr/><tr><th> EMAIL</th><td>'
                                                            + viewcompanydetail.Email +                                                     
                                                  '</td></tr>';	
                                                });
                  
                    $('#completeCompanyDetail').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  
        
    
    
    });   

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                                                                            
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////DELETE COMPANY/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
   
$("#deleteCompanyBtn").click(function(){
    var company =  $("#deleteCompanyName").val();
    var flag = 0;
      if(company =="")
      {
          $("#deleteCompanyMessage").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
          $("#deleteCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
      }
      else{          
          $.ajax({
                type: 'GET',
                url :'/api/companyname/',
                success: function(allcompanynames) {                                           
	                                       $.each(allcompanynames, function(i, acompanyname){                                               
                                                if(acompanyname.CompanyName==company)                                                    
                                                    {
                                                        flag = 1;                                                        
                                                     }           
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
          
          setTimeout(function (){
              
              if(flag == 1){
                var $aman;   
                $.ajax({
                    type: 'PUT',
                    url :'/api/companydelete/' + company,
                    success: function() {
                                    $("#deleteCompanyMessage").css("color","#37bc9b").text("*Company has been Removed.");
                                    $("#deleteCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
                                        },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
              }

             if(flag == 0){
                $("#deleteCompanyMessage").css("color","red").text("*Incorrect Company Name. Click on Reset & Try again."); 
                $("#deleteCompanyBtn").css("backgroundColor","gray").attr('disabled',true);
                 }

         }, 300);         
      }  
  });
     $("#deleteCompanyResetBtn").click(function(){          
            $("#deleteCompanyMessage").text("");  
          $("#deleteCompanyBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
    
  });
    
    
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    
  
    
    
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MESSAGES////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
      
    $("#newMessageModalBtn").on('click',function(){ 
        $("#toMessage").empty();
        $.ajax({           
            type: 'GET',
            url: '/api/adminrelation',            
            success: function(managers){
                $.each(managers,function(i,manager){
                    $("#toMessage").append('<option value=' + manager.U_ID + '>' + manager.UserName + ' -- ' + manager.Name + '</option>');
                });               
                                                                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
        
        
    });
      
    
      
    $("#addMessgaeBtn").on('click',function(){
    
        var msg = {
         MsgFrom: sessionStorage.getItem("Id"),
         MsgTo: $("#toMessage").attr('value'),
         Subject: $("#MsgSubject").val(),
         Message: $("#message").val()
         };
        
        $.ajax({           
            type: 'POST',
            url: '/api/message',
            data: msg,
            success: function(){
                $("#messgaeMsg").css("color","#37bc9b").text("**Message Sent.");
                $("#addMessgaeBtn").css("backgroundColor","gray").attr('disabled',true);
                setTimeout(function (){                
                $("#messgaeMsg").css("color","#37bc9b").text("");
                $("#addMessgaeBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
                $("#toMessage").val("");
                $("#MsgSubject").val("");
                $("#message").val("");
                },2500);
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
        
          
    });
      
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////INBOX//////////////////////////////////////////////////////////////////////////// 


 $("#viewInboxBtn").on('click',function(){ 
     
     $("#viewInboxBody").empty();
     var $aman="";
     $.ajax({
                    type: 'GET',
                    url :'/api/inbox/' + sessionStorage.getItem("Id"),
                    success: function(viewmsgs) {                                               
                                               $.each(viewmsgs, function(i, eachmsg){                                       

                                            $aman +=   '<tr data-id='+ eachmsg.MsgID +'><td>'  
                                                                + eachmsg.Name + 
                                                          '</td><td>' 
                                                                + eachmsg.Subject + 
                                                          '</td><td>'                                              
                                                                + eachmsg.DateCreated +                                                 
                                                          '</td></tr>';	
                                                    });                    
                        $('#viewInboxBody').append($aman);

                                                    },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
     
 });




  
    $('.userTables #viewInboxTable').on('click','tbody tr',function(){       
        
        var $aman;   
        $.ajax({
                type: 'GET',
                url :'/api/viewmessage/' + $(this).attr('data-id'),
                success: function(msgs) {
                                           $('#viewMessageModal').modal('hide');
                                           $('#viewFromMessage').val("");
                                           $('#viewMsgSubject').val("");
                                           $('#viewMessage').val("");
                                           $('#viewInboxMessageModal').modal('show');
                                           $('#viewInboxMessage').show();
	                                       $.each(msgs, function(i, msg){   
                                               
                                               $('#viewFromMessage').val(msg.Name);
                                               $('#viewMsgSubject').val(msg.Subject);
                                               $('#viewMessage').val(msg.Message);
		                                  
                                           });
                    
                    
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  
        
    
    
    });   
    

















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////ADMIN NOTIFICATIONS///////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

$.ajax({
                type: 'GET',
                url :'/api/messagenotif/' + sessionStorage.getItem("Id"),
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifMessage").text(notif.Msg)
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
$.ajax({
                type: 'GET',
                url :'/api/pendingtaskadmin',
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifTask").text(notif.Task + " Task")
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
$.ajax({
                type: 'GET',
                url :'/api/pendingvisitadmin',
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifVisit").text(notif.Visit + " Visits")
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
$.ajax({
                type: 'GET',
                url :'/api/dbsize',
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifDb").text(notif.SizeinMB + " Mb")
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
            }); 
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////ADMIN DASHBOARD TABLE/////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    

$( document ).ready(function() {
    
///////////////////////////////////////////////////////////////////ADMIN DASHBOARD TABLE ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    var $aman;
    var j=1;
    var x;
    var y;
    $.ajax({
                type: 'GET',
                url :'/api/db',
                success: function(tablenames) {                                          
	                                       $.each(tablenames, function(i, tablename){                                                                 
                                                x=tablename.table_name;
                                                    $.ajax({
                                                                type: 'GET',
                                                                url :'/api/tablesize/' + x,
                                                                success: function(tablesizes) {                                          
                                                                                           $.each(tablesizes, function(i, tablesize){                    
                                                                                               y=tablename.table_name;
                                                                                               if(j%2==0)
                                                                                               {
                                                                                                $aman +=  '<tr data-id='+ y +'><td>'
                                                                                                                + j +
                                                                                                        '</td><td>'
                                                                                                                + tablename.table_name + 
                                                                                                        '</td><td>'
                                                                                                                + tablename.table_rows +
                                                                                                        '</td><td>'
                                                                                                                + tablesize.SizeinMB +
                                                                                                        '</td></tr>';	
                                                                                               }
                                                                                               else{
                                                                                                   $aman +=  '<tr class="oddRow" data-id='+ y +'><td>'
                                                                                                                + j +
                                                                                                        '</td><td>'
                                                                                                                + tablename.table_name +
                                                                                                       '</td><td>'
                                                                                                                + tablename.table_rows +
                                                                                                        '</td><td>'                                      
                                                                                                                + tablesize.SizeinMB + 
                                                                                              '</td></tr>';	
                                                                                               }
                                                                                               
                                                                                              
                                                                                                });
                                                                                            j++;
                                                                  //  alert(j);

                                                                                          },
                                                                error: function(){
                                                                                          alert('Cannot load the Table');
                                                                                 }
                                                        

                                                              });                                                             
                                              
                                                            });
                    
                                                             setTimeout(function (){                    
                                                                $('#adminDashboardTable').append($aman);
                                                             }, 300);   
                                               
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              
            });
    
    
    
    
///////////////////////////////////////////////////////////////////SHOW COMPLETE TABLE DETAILS/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    $('.dbTables').on('click','tr',function(){       
        $('#viewTableSchemaBody').empty();
        var $aman="";   
        $.ajax({
                type: 'GET',
                url :'/api/tableschema/' + $(this).attr('data-id'),
                success: function(viewtableschemas) {                                          
                                           $('#dbTableModal').modal('show');
	                                       $.each(viewtableschemas, function(i, viewtableschema){                                       
		                                 
                                        $aman +=      '<tr><td>' 
                                                            + viewtableschema.Column_Name + 
                                                      '</td><td>'
                                                            + viewtableschema.Data_Type +
                                                      '</td><td>'
                                                            + viewtableschema.Max_Length +                                                                       
                                                  '</td></tr>';	
                                                });
                  
                    $('#viewTableSchemaBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  
        
    
    
    });   

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    
    
    
    
    
      $("#logoutBtn").click(function(){
        
      sessionStorage.setItem("Login","false"); 
      sessionStorage.setItem("UserName","NULL");
      sessionStorage.setItem("Name","NULL");
      sessionStorage.setItem("Role","NULL");
      window.location="http://localhost:7000/index.html";
        
        
    });    
    
    
    $("#tempLock").click(function(){
    
    sessionStorage.setItem("Login","false"); 
    
     });    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    });