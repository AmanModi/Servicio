  
  $(document).ready(function(){
  
  $("#nameX").text(sessionStorage.getItem("Name"));      
      
      
      
      
///////////////////////////////////////////////////////////////UPDATE VISIT////////////////////////////////////////////////////////////////////////////////////  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#updateVisitModalBtn').on('click',function(){
    $('#VisitId').val("");
});

var $V_ID;
      
$('#updateVisitBtn').on('click',function(){
    var $aman1="";
    $V_ID = $('#VisitId').val();
    if($V_ID=="")
    {
        $("#updateVisitMessage").css("color","red").text("*Blank Space not allowed. Click on Reset & Try again."); 
        $("#updateVisitBtn").css("backgroundColor","gray").attr('disabled',true);
    }
    
    else{
        
        $.ajax({
                type: 'GET',
                url :'/api/taskbyvisit/' + $V_ID,
                success: function(viewtasks) {
                                           if(viewtasks=="")
                                           {
                                                $("#updateVisitMessage").css("color","red").text("*Incorrect Visit Id. Click on Reset & Try again."); 
                                                $("#updateVisitBtn").css("backgroundColor","gray").attr('disabled',true);
                                           }
	                                       $.each(viewtasks, function(i, viewtask){
                                            	        $('#updateTaskDetailTableBody').empty();
                                                        $('#updateVisitDetailTable').show();
                                                        $('#updateVisitModal').modal('hide');
                                                        $('#updateVisitDetailModal').modal('show');
                                                var $t_id = viewtask.T_ID;
                                                $aman1 +=  '<tr data-id='+ $t_id +'><td>'  
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
                    $('#updateTaskDetailTableBody').append($aman1);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  
    
    }
});
      
$('#updateVisitResetBtn').click(function(){   
   
        $("#updateVisitMessage").css("color","red").text(""); 
        $("#updateVisitBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
   
});
      
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          
/////////////////////////////////////////////////////////UPDATE TASK Status////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
      var $T_ID;
      

       $('.userTables #updateVisitDetailTable').on('click','tbody tr',function(){       
        var $aman = "";
        var $aman1 = "";
           $("#updateTaskMessage").css("color","#37bc9b").text("");
           $("#updateTaskBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
           $('#updateVisitDetailModal').modal('hide');
           $('#updateTaskModal').modal('show');
      
        $T_ID = $(this).attr('data-id');
    
          $.ajax({
                type: 'GET',
                url :'/api/taskstatus/' + $T_ID,
                success: function(tasks) {
                                           $.each(tasks, function(i, task){
                                            	                                  
                                                $("#taskStatus").val(task.Status)
                                                });
                    $('#viewVisitDetailTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              }); 
       });
      
      
      
    
    
     $("#updateTaskBtn").click(function(){
        
         var $aman1 = "";
        
        var tasks = {
         Status: $("#taskStatus").val()
         };
        
        $.ajax({           
            type: 'PUT',
            url: '/api/taskupdate/' + $T_ID,
            data: tasks,
            success: function(){                
                
                $("#updateTaskMessage").css("color","#37bc9b").text("Status Updated. This Windows will close in 3 seconds");
                $("#updateTaskBtn").css("backgroundColor","gray").attr('disabled',true);
                setTimeout(function (){                
                $.ajax({
                type: 'GET',
                url :'/api/taskbyvisit/' + $V_ID,
                success: function(viewtasks) {
                                           
	                                       $.each(viewtasks, function(i, viewtask){
                                            	        $('#updateTaskDetailTableBody').empty();
                                                        $('#updateVisitDetailTable').show();
                                                        $('#updateTaskModal').modal('hide');    
                                                        $('#updateVisitDetailModal').modal('show');
                                                var $t_id = viewtask.T_ID;
                                                $aman1 +=  '<tr data-id='+ $t_id +'><td>'  
                                                        + viewtask.Task + 
                                                  '</td><td>'
                                                        + viewtask.Status +                                                
                                              '</td></tr>';	
                                                });
                    $('#updateTaskDetailTableBody').append($aman1);
                    
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  
                    
                },2100);
                                                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
        
        
            
    });
      
      
          
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
      
////////////////////////////////////////////////////////////VIEW VISIT///////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
     $("#viewVisit").on('click', function(){
     var $aman;       
     $('#viewVisitTableBody').empty();
     
   
        $.ajax({
                type: 'GET',
                url :'/api/visitforEmployee/' + sessionStorage.getItem("Id"),
                success: function(viewvisits) {
                                           $("#viewVisitTableModal").modal('show');
                                           $("#viewVisitTable").show();
	                                       $.each(viewvisits, function(i, viewvisit){
                                            var $v_id = viewvisit.V_ID;
		                                  /* $viewAllUserTableBody.append(  */
                                                $aman +=  '<tr data-id='+ $v_id +'><td>' 
                                                        + viewvisit.V_ID + 
                                               //   '</td><td>'
                                                //        + viewvisit.Name + 
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
                                                        + viewvisit.DOA +
                                                  '</td><td>'
                                                        + viewvisit.DOC +
                                                //  '</td><td>'
                                                //        + eachuser.Role +
                                              '</td></tr>';	
                                                });
                    $('#viewVisitTableBody').append($aman);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  

 });
      
      
      $('.userTables #viewVisitTable').on('click','tbody tr',function(){       
        var $aman = "";
        var $aman1 = "";
      $('#viewVisitDetailTableBody').empty();
      $('#viewTaskDetailTableBody').empty();     
      $("#viewVisitDetailTable").show(); 
        var id = $(this).attr('data-id');
     
          $.ajax({
                type: 'GET',
                url :'/api/visit/' + $(this).attr('data-id'),
                success: function(viewvisits) {
                                           $('#viewVisitTableModal').modal('hide');
                                           $("#viewVisitDetailModal").modal('show');
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
                    $('#viewVisitDetailTableBody').append($aman);
                    
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
                    $('#viewTaskDetailTableBody').append($aman1);
                    
                                          },
                error: function(){
                                          alert('Cannot Connect at the Moment. Please try again after sometime.');
                                 }

              });  

        
    
    
    });   
    
    
      
      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FEEDBACK REPORTS////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
      
    $('#feedbackModalBtn').on('click',function(){        
        $("#feedbackMessage").css("color","#37bc9b").text("");
        $("#addFeedbackBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
        $("#managerName").val("");
        $("#subject").val("");
        $("#feedback").val("");
        
        $.ajax({           
            type: 'GET',
            url: '/api/relation/' + sessionStorage.getItem("Id"),            
            success: function(managers){
                $.each(managers,function(i,manager){
                   // $("#managerName").val(manager.UserName);
                    $("#managerName").append('<option value=' + manager.U_ID + '>' + manager.UserName + '</option>');
                });               
                                                                
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
        
        
    });
      
    
      
    $("#addFeedbackBtn").on('click',function(){
    
        var feed = {
         E_ID: sessionStorage.getItem("Id"),
         M_ID: $("#managerName").attr('value'),
         Subject: $("#subject").val(),
         Feedback: $("#feedback").val()
         };
        
        $.ajax({           
            type: 'POST',
            url: '/api/feedback',
            data: feed,
            success: function(fed){
                $("#feedbackMessage").css("color","#37bc9b").text("Feedback Received.");
                $("#addFeedbackBtn").css("backgroundColor","gray").attr('disabled',true);
                setTimeout(function (){                
                $("#feedbackMessage").css("color","#37bc9b").text("");
                $("#addFeedbackBtn").css("backgroundColor","#37bc9b").attr('disabled',false);
                $("#managerName").val("");
                $("#subject").val("");
                $("#feedback").val("");
                },2500);
            },

            error: function(){
                        alert('Unable to Connect to Server at the moment. Please try again after some time.');
                             }

          });
        
          
    });
      
      
      
      
      
      
      
      
      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MESSAGES////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     
/////////////////////////////////////////////////////////////////ADDMessage///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
      
    $("#newMessageModalBtn").on('click',function(){        
        $("#toMessage").empty();
        $.ajax({           
            type: 'GET',
            url: '/api/relation/' + sessionStorage.getItem("Id"),            
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////EMPLOYEE NOTIFICATIONS///////////////////////////////////////////////////////////////////////////////////////// 
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
                url :'/api/pendingtaskforemployee/'  + sessionStorage.getItem("Id"),
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifTask").text(notif.Task + " Tasks")
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
              }); 
$.ajax({
                type: 'GET',
                url :'/api/pendingvisitforemployee/' + sessionStorage.getItem("Id"),
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
                url :'/api/nextvisitforemployee/'  + sessionStorage.getItem("Id"),
                success: function(notif1) {                                           
	                                       $.each(notif1, function(i, notif){                                               
                                                $("#notifVisitTomorrow").text(notif.Visit + " Visits")
                                          });
                   
                                        },
                error: function(){
                                          alert('Unable to Connect to Server at the moment. Please try again after some time.');
                                 }
    
            }); 
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////       
      
      
      
      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      
  
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