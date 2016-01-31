$(document).ready(function(){
    $("#nameX").text(sessionStorage.getItem("Name"));  
   
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////COMPANY//////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////Visit//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
////////////////////////////////////////////////////////////ADD NEW VISIT////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
$("#addVisitModalBtn").click(function(){
    
    sessionStorage.setItem("V_ID","NULL");
      var $aman="";
      var $aman1="";
      $('#visitEmployee').empty();
      $('#visitCompany').empty();
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
                   $('#visitEmployee').append($aman);
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
    
        $.ajax({
                    type: 'GET',
                    url :'/api/companyname/',
                    success: function(companies) {                                           
                                               $.each(companies, function(i, company){
                                                   var $cID = company.C_ID;
                                                 $aman1 +=  '<option data-id='+ $cID +'><td>' 
                                                            + company.CompanyName 
                                                      '</option>';	  
                                              });
                       $('#visitCompany').append($aman1);
                                            },
                    error: function(){
                                              alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                     }

                  }); 
      
  });
    
    
    $("#addVisitBtn").click(function(){
        
        var V_ID="";
        var visits = {
         E_ID: $('#visitEmployee option:selected').attr('data-id'),
         M_ID: sessionStorage.getItem("Id"),
         C_ID: $('#visitCompany option:selected').attr('data-id'),
         DOC: $('#DOC').val()
        };
        
        if($('#DOC').val() != "")
        {        
        $.ajax({           
            type: 'POST',
            url: '/api/visit',
            data: visits,
            success: function(visitids){                
                sessionStorage.setItem("V_ID",visitids.insertId);
                $("#visitID").css("color","#37bc9b").text("VISIT Number is " + visitids.insertId);
                 $("#addVisitBtn").css("backgroundColor","gray").attr('disabled',true);
                setTimeout(function (){
                $("#assignVisitMessage").css("color","red").text("Visit has been Assigned. Please allocate the tasks.");                  
                },3000);
                setTimeout(function (){
                     $('#addVisitModal').modal('hide');
                     $('#addTaskModal').data('modal', null);
                     $('#addTaskModal').modal('show');
                     $("#assignVisitMessage").css("color","#37bc9b").text("");   
                     $("#visitID").css("color","#37bc9b").text("");   
                     $("#addVisitBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
                     $('#DOC').val("");
                     $("#visitIDonTaskPage").css("color","red").text("**VISIT Number is " + sessionStorage.getItem("V_ID"));
                     $("#addTaskMessage").css("color","#37bc9b").text("");
                    $("#task").val("");
                },6500);
                                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
        }
        
        else{
            $("#assignVisitMessage").css("color","red").text("Due Date can't be left Empty.");
            $("#addVisitBtn").css("backgroundColor","gray").attr('disabled',true);
            setTimeout(function (){
            $("#assignVisitMessage").text("");
            $("#addVisitBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
            },3000);
            
        }
        

        
    });
    
    
    $("#closeBtn").click(function(){
        
        $('#addTaskModal').data('modal', null);
        $('#addTaskModal').modal('hide');
        sessionStorage.setItem("V_ID","NULL");
        $('#task').val("")
    });
    
    $("#addCurrentTaskBtn").click(function(){
       
        var taskdetails = {
            V_ID: sessionStorage.getItem("V_ID"),
            Task: $("#task").val()
        };
        
         $.ajax({           
            type: 'POST',
            url: '/api/task',
            data: taskdetails,
            success: function(x){                
                $("#addTaskMessage").css("color","#37bc9b").text("This task has been assigned. Click on 'Add More Task' to add more else press 'Close'");
                                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
       
    });
    
    $("#addMoreTaskBtn").click(function(){
    
    $("#visitIDonTaskPage").css("color","red").text("**VISIT Number is " + sessionStorage.getItem("V_ID"));
    $("#addTaskMessage").css("color","#37bc9b").text("");
    
    
    });
 
    
    
////////////////////////////////////////////////////////////VIEW VISITS ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $("#viewAllVisitBtn").on('click', function(){
     var $aman;       
     $('#viewAllVisitTableBody').empty();
     $("#viewAllVisitTable").show(); 
   
        $.ajax({
                type: 'GET',
                url :'/api/visit/',
                success: function(viewvisits) {
                                           $("#viewVisitTableModal").show();
	                                       $.each(viewvisits, function(i, viewvisit){
                                            var $v_id = viewvisit.V_ID;
		                                  /* $viewAllUserTableBody.append(  */
                                                $aman +=  '<tr data-id='+ $v_id +'><td>' 
                                                        + viewvisit.V_ID + 
                                                  '</td><td>'
                                                        + viewvisit.Name + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                  '</td><td>'
                                                        + viewvisit.CompanyName +
                                                  '</td><td>'
                                                       // + eachuser.Address +
                                                 // '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                        + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewAllVisitTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  

 });
    
    
 $('.userTables #viewAllVisitTable').on('click','tbody tr',function(){       
        var $aman = "";
        var $aman1 = "";
      $('#viewAllVisitDetailTableBody').empty();
      $('#viewAllTaskDetailTableBody').empty();     
      $("#viewVisitDetailTable").show(); 
        var id = $(this).attr('data-id');
     
          $.ajax({
                type: 'GET',
                url :'/api/visit/' + $(this).attr('data-id'),
                success: function(viewvisits) {
                                           $('#viewVisitTableModal').modal('hide');
                                           $("#viewCompleteVisitDetailModal").modal('show');
	                                       $.each(viewvisits, function(i, viewvisit){
                                            var $v_id = viewvisit.V_ID;		                                  
                                                $aman +=  '<tr><td>' 
                                                        + viewvisit.V_ID + 
                                                  '</td><td>'
                                                        + viewvisit.Name + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                  '</td><td>'
                                                        + viewvisit.CompanyName +
                                                  '</td><td>'
                                                        + viewvisit.DOA +
                                                  '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                        + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewAllVisitDetailTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  
     
     $.ajax({
                type: 'GET',
                url :'/api/taskbyvisit/' + $(this).attr('data-id'),
                success: function(viewtasks) {
                                           
	                                       $.each(viewtasks, function(i, viewtask){
                                            	                                  
                                                $aman1 +=  '<tr><td>' 
                                                        + viewtask.Task + 
                                                  '</td><td>'
                                                        + viewtask.Status + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                //  '</td><td>'
                                                    //    + viewvisit.CompanyName +
                                              //    '</td><td>'
                                                   //     + viewvisit.DOA +
                                                //  '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                 //       + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewAllTaskDetailTableBody').append($aman1);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  

        
    
    
    });   
    
    
    
////////////////////////////////////////////////////////////VIEW PARTICUALR VISITS /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     $('#viewVisitModalBtn').on('click',function(){  
    $('#viewByVisitId').val("");
     });
    
    
    $('#viewParticularVisitBtn').on('click',function(){     
        var id = $('#viewByVisitId').val();
        var flag = '0';
        var $aman = "";
        var $aman1 = "";
      $('#viewParticualrVisitDetailTableBody').empty();
      $('#viewParticualrVisitTaskDetailTableBody').empty();     
      $("#viewParticularVisitDetailTable").show(); 
       
     if (id == ""){
          $("#viewParticularVisitMessage").css("color","red").text("Visit Id can't be left Empty.");
            $("#viewParticularVisitBtn").css("backgroundColor","gray").attr('disabled',true);
            setTimeout(function (){
            $("#viewParticularVisitMessage").text("");
            $("#viewParticularVisitBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
            },3000);
         
     }
    
    else{
        
        
         $.ajax({
                type: 'GET',
                url :'/api/visitId' ,
                success: function(visitids) {
                $.each(visitids, function(i, visitid){
                    if(visitid.V_ID == id){
                        flag = 1;
                    }
                });
            },
          error: function(){
                  alert('Cannot Connect at the Moment. Please try again after sometime.');
           }

            
        });
        
        
        
        setTimeout(function(){
        if(flag == 1)    
        { 
          $.ajax({
                type: 'GET',
                url :'/api/visit/' + id,
                success: function(viewvisits) {                                         
                                           $("#viewVisitModal").modal('hide');
                                           $("#viewParticularVisitDetailModal").modal('show');
	                                       $.each(viewvisits, function(i, viewvisit){
                                            var $v_id = viewvisit.V_ID;		                                  
                                                $aman +=  '<tr><td>' 
                                                        + viewvisit.V_ID + 
                                                  '</td><td>'
                                                        + viewvisit.Name + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                  '</td><td>'
                                                        + viewvisit.CompanyName +
                                                  '</td><td>'
                                                        + viewvisit.DOA +
                                                  '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                        + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewParticualrVisitDetailTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  
     
     $.ajax({
                type: 'GET',
                url :'/api/taskbyvisit/' + id,
                success: function(viewtasks) {
                                           
	                                       $.each(viewtasks, function(i, viewtask){
                                            	                                  
                                                $aman1 +=  '<tr><td>' 
                                                        + viewtask.Task + 
                                                  '</td><td>'
                                                        + viewtask.Status + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                //  '</td><td>'
                                                    //    + viewvisit.CompanyName +
                                              //    '</td><td>'
                                                   //     + viewvisit.DOA +
                                                //  '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                 //       + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewParticualrVisitTaskDetailTableBody').append($aman1);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });
        }
        else{
            $("#viewParticularVisitMessage").css("color","red").text("Visit Id not Assigned Yet.");
            $("#viewParticularVisitBtn").css("backgroundColor","gray").attr('disabled',true);
            setTimeout(function (){
            $("#viewParticularVisitMessage").text("");
            $("#viewParticularVisitBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
                $('#viewByVisitId').val("");
            },3000);
        }
            },300);

        
    }
    
    });   
    
    
    
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                                                                            
       
    
    
////////////////////////////////////////////////////////////DELETE PARTICULAR VISIT/////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $('#deleteParticularVisitBtn').click(function(){
        var V_ID = $("#deleteByVisitId").val();
        $.ajax({
            type:'GET',
            url:'/api/visitbyManager/' + sessionStorage.getItem("Id"),
            success: function(allvisitids){
                var flag = '0';
                $.each(allvisitids,function(i,visitids){
                    if(V_ID == visitids.V_ID)
                       {
                           flag = '1';
                       }
                        if(flag == '1')
                        {
                        $.ajax({
                            type:'PUT',
                            url:'/api/visitdelete/' + V_ID,
                            success: function(){
                                $.ajax({
                                    type:'PUT',
                                    url:'/api/tasksdelete/' + V_ID,
                                    success: function(){
                                        $('#deleteParticularVisitMessage').css('color','red').text("**Visit has been Deleted");
                                        $('#deleteParticularVisitBtn').css('backgroundColor','gray').attr('disabled',true);
                                        setTimeout(function(){
                                            $('#deleteParticularVisitMessage').css('color','red').text("");
                                            $('#deleteParticularVisitBtn').css('backgroundColor','#37bc9b').attr('disabled',false);
                                            $("#deleteByVisitId").val("")
                                        },3000);
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
                       }
                        
                        else{
                           
                             $('#deleteParticularVisitMessage').css('color','red').text("**Incorrect Id");
                                $('#deleteParticularVisitBtn').css('backgroundColor','gray').attr('disabled',true);
                                setTimeout(function(){
                                    $('#deleteParticularVisitMessage').css('color','red').text("");
                                    $('#deleteParticularVisitBtn').css('backgroundColor','#37bc9b').attr('disabled',false);
                                    $("#deleteByVisitId").val("")
                                },3000);
                                 
                    }
               
                });
            },
          error: function(){
        alert('Unable to Connect to Server at the moment. Please try again after some time.');
        }
        });
        
        
        
        
    });
   
////////////////////////////////////////////////////////////VIEW VISITS toDELETE PARTICULAR VISIT////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $("#viewAllVisitToDeleteBtn").on('click', function(){
     var $aman;
    $('#deleteVisitMessage').css('color','red').text("**Click on a row to delete the assigned visit.");
     var role =  $("#userRole").val(); 
     $('#viewAllVisittoDeleteTableBody').empty();
     $("#viewAllVisittoDeleteTable").show(); 
   
        $.ajax({
                type: 'GET',
                url :'/api/visit/',
                success: function(viewvisits) {
                                           $("#deleteVisitTableModal").show();
	                                       $.each(viewvisits, function(i, viewvisit){
                                            var $v_id = viewvisit.V_ID;
		                                  /* $viewAllUserTableBody.append(  */
                                                $aman +=  '<tr data-id='+ $v_id +'><td>' 
                                                        + viewvisit.V_ID + 
                                                  '</td><td>'
                                                        + viewvisit.Name + 
                                               //   '</td><td>'
                                                 //       + eachuser.DOB +
                                                  '</td><td>'
                                                        + viewvisit.CompanyName +
                                                  '</td><td>'
                                                       // + eachuser.Address +
                                                 // '</td><td>'
                                                    //    + eachuser.City +
                                                 // '</td><td>'
                                                   //     + eachuser.State +
                                                 // '</td><td>'
                                                     //   + eachuser.Mobile +
                                                 // '</td><td>'
                                                        + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewAllVisittoDeleteTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  

 });
    
    
 $('.userTables #viewAllVisittoDeleteTable').on('click','tbody tr',function(){       
        
        var $aman = $(this).closest('tr');  
        var id = $(this).attr('data-id');
     
        $.ajax({
                type: 'PUT',
                url :'/api/visitdelete/' + $(this).attr('data-id'),
                success: function() {
                    
                     $.ajax({
                                    type:'PUT',
                                    url:'/api/tasksdelete/' + id,
                                    success: function(){
                                         $aman.fadeOut(1500, function(){
				                            $(this).remove();
                                         });

                                        $('#deleteVisitMessage').css('color','#37bc9b').text("**Visit Deleted.");
                                        setTimeout(function(){
                                           $('#deleteVisitMessage').css('color','red').text("**Click on a row to delete the assigned visit."); 
                                        },3000);
                                     
                                    },
                                    error: function(){
                                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                        }
                                });
                    
                   
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  
        
    
    
    });   
    
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////EMPLOYEE/////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    
///////////////////////////////////////////////////////////////////ALL EMPLOYEES///////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
    
  
    $("#viewRoleUserBtn").on('click', function(){ 
        $('#viewEmployeeByRoleTableBody').empty(); 
        var role = $('#EmployeeRole').val();
        $userRole = role;
        var $aman;
        $.ajax({
                type: 'GET',
                url :'/api/usersbyrole/' + role,
                success: function(viewroleusers) {
                                           $("#viewEmployeeByRoleTable").show();
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
                    $('#viewEmployeeByRoleTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot load To do List');
                                 }

              });  

            
    });
    
    
   
      $('.userTables #viewEmployeeByRoleTable').on('click','tbody tr',function(){  
          
         
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
                                                      '</td></tr>';	
                                                        });

                            $('#completeUserDetail').append($aman);

                                                  },
                        error: function(){
                                                  alert('Cannot load To do List');
                                         }

                      });  

               
    });   
    
    
////////////////////////////////////////////////////////////PARTICULAR EMPLOYEES///////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    
 $('#viewEmplyeesBtn').click(function(){
     $("#viewParticularUserUserName").val("");
 });
    
    
  $("#viewParticularUserBtn").click(function(){
    var user =  $("#viewParticularUserUserName").val();
    var flag = 0;
      var $aman="";  
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
                 
                $.ajax({
                    type: 'GET',
                    url :'/api/userbyusername/' + user,
                    success: function(viewroleusers) {
                                               $('#viewUserModal').modal('hide');
                                               $('#completeParticularUserDetail').empty();
                                               $('#completeParticularUserDetailModal').modal('show');
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
                        $('#completeParticularUserDetail').append($aman);

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MESSAGES////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
/////////////////////////////////////////////////////////////////ADDMessage///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
      
    $("#newMessageModalBtn").on('click',function(){        
        $("#toMessage").empty();
        $.ajax({           
            type: 'GET',
            url: '/api/managerrelation/' + sessionStorage.getItem("Id"),            
            success: function(managers){
                $.each(managers,function(i,manager){
                    $("#toMessage").append('<option value=' + manager.U_ID + '>' + manager.UserName + '</option>');
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
////////////////////////////////////////////////////////////FEEDBACK/////////////////////////////////////////////////////////////////////////////////// 


 $("#viewFeedbackBtn").on('click',function(){ 
     
     $("#viewFeedbackBody").empty();
     var $aman="";
     $.ajax({
                    type: 'GET',
                    url :'/api/feedback/' + sessionStorage.getItem("Id"),
                    success: function(viewfeeds) {                                               
                                               $.each(viewfeeds, function(i, eachfeed){                                       

                                            $aman +=   '<tr data-id='+ eachfeed.F_ID +'><td>'  
                                                                + eachfeed.Name + 
                                                          '</td><td>' 
                                                                + eachfeed.Subject + 
                                                          '</td><td>'                                              
                                                                + eachfeed.DateCreated +                                                 
                                                          '</td></tr>';	
                                                    });                    
                        $('#viewFeedbackBody').append($aman);

                                                    },
                  error: function(){
                            alert('Cannot Connect to the Server at the moment. Please Try again after sometime.');
                                   }
                     });
     
 });

    
    
    $('.userTables #viewFeedbackTable').on('click','tbody tr',function(){       
        
        var $aman;   
        $.ajax({
                type: 'GET',
                url :'api/viewfeedback/' + $(this).attr('data-id'),
                success: function(msgs) {
                                           $('#viewFeedbackModal').modal('hide');
                                           $('#feedbackFrom').val("");
                                           $('#feedSubject').val("");
                                           $('#feedback').val("");
                                           $('#viewParticularFeedbackModal').modal('show');
                                           $('#viewFeed').show();
	                                       $.each(msgs, function(i, msg){   
                                               
                                               $('#feedbackFrom').val(msg.Name);
                                               $('#feedSubject').val(msg.Subject);
                                               $('#feedback').val(msg.feedback);
		                                  
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
///////////////////////////////////////////MANAGER NOTIFICATIONS///////////////////////////////////////////////////////////////////////////////////////// 
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
                url :'/api/pendingtaskofmanager/' + sessionStorage.getItem("Id"),
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifTask").text(notif.Task)
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
$.ajax({
                type: 'GET',
                url :'/api/pendingvisitmanager/' + sessionStorage.getItem("Id"),
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifVisit").text(notif.Visit)
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
$.ajax({
                type: 'GET',
                url :'/api/totalfeedback/'  + sessionStorage.getItem("Id"),
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifFeedback").text(notif.Feedback + " Feedback")
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
            }); 
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    

    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
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