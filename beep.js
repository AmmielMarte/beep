var uid;
  // Get a reference to the root of the chat data.
   var messagesRef;
 $(document).ready(function()
 {   
  uid=0;
     hide();
     messagesRef = new Firebase('https://radiant-fire-5086.firebaseio.com');
 //busca los mensajes remitidos al usuario
    var authClient = new FirebaseSimpleLogin(messagesRef, function(error, user) {
    	

  if (error) {
    alert("Usuario no valido");
    return;
  }
  if (user) {
 
    // User is already logged in.
   // console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
	messagesRef = new Firebase('https://radiant-fire-5086.firebaseio.com/'+ user.id);
	 
  // Add a callback that is triggered for each chat message.
    uid=user.id
    messagesRef.limit(10).on('child_added', function (snapshot) {
	uid=user.id
    var message = snapshot.val();
    if (typeof  message.mensaje !='undefined'){ 
	 $('#messagesDiv').append('<div class="author">'+message.usuario+' </div> ');
	 	 $('#messagesDiv').append('<div class="message"><em/>'+message.mensaje+'</div>'); 
		 $('#messagesDiv').append('<div class="line"></div>'); 
	 
	}
    $('#salir').click(function(){
	 authClient.logout();
	 hide();
	 $("#Clave").val('');
	 $("#messagesDiv").empty()
	 $("#Login").show();  
	});
	//agrega amigos
	if (typeof  message.email !='undefined'){ 
	 $('#circuloamigo').append('<option  value="'+message.id+'">'+message.email+' </option> '); 
    } 
		});
	//recibiendo mensajes
	$('#beep').click(function(){
	   hide();
	   show("messagesDiv");
	   show("enviarmensaje");
	});

    //registro amigos
    $('#friends').click(function(){
	  hide();
      show("RegistraAmigos");
	

});
	//envio mensajes
	$('#sendmsn').click(function(){
	 	 hide();
     $("#enviarmensaje").show(); 

	});

     hide();  

	 show("messagesDiv");
	 show("enviarmensaje");
  } else {
    // User is logged out.
    //showLoginBox(); 

	    alert("Verificar conexion");
	 
  }
});
 
// When the user presses enter on the message input, write the message to firebase.
$('#btnenviamsn').click(function () {
  
    if($('#circuloamigo').val() > 0)
	 {
	    sendmsref = new Firebase('https://radiant-fire-5086.firebaseio.com/'+$('#circuloamigo').val());
        sendmsref.push({usuario:$('#usuario').val(), mensaje:$('#messageInput').val()});
      
			 $('#messagesDiv').append('<div class="me">'+$("#usuario").val()+' </div> ');
	 	 $('#messagesDiv').append('<div class="textsend"><em/>'+$('#messageInput').val()+'</div>'); 
		 $('#messagesDiv').append('<div class="line"></div>'); 
		   $('#messageInput').val('');
	}
  });
  //clic credenciales de conexion
$("#credencial").on("touchend", function () {
	    alert("trata conectar");
      authClient.login("password", {
      email: $("#usuario").val(),
      password: $("#Clave").val(),
      rememberMe: $("#recordar").val()
    });
       alert("envio conexion");
	
     });
 //registro usuario buton login
$('#Registro').click(function()
{
     hide();
	 show("Registrousuario");
     
});
//registrar usuario
$('#createuser').click(function()
{   
 hide();
if ($('#claveusuario').val()==$('#confirmar').val())
{ 
	 authClient.createUser($('#usuarioRegistro').val(), $('#claveusuario').val(), function(error, user) {
	 if (!error) { 
			var auth = new Firebase('https://radiant-fire-5086.firebaseio.com/Usuarios');
			auth.push({id:user.id, email:user.email});			
			hide();
			//crea perfil usuario
			var auth = new Firebase('https://radiant-fire-5086.firebaseio.com');
			auth.push(user.id);
		    //crea nodo amigos
			hide();
			
			$("#Login").show();
		}
	});
  }
});
	    
$('#createfriend').click(function(){
if (uid!=0){}
	var usersRef = new Firebase('https://radiant-fire-5086.firebaseio.com/Usuarios');
	usersRef.on('child_added', function(snapshot) {
	  var message = snapshot.val();
	  if ( $('#Email').val()==message.email){		   
	  sendmsref = new Firebase('https://radiant-fire-5086.firebaseio.com/'+uid);
      sendmsref.push({id:message.id, email:$('#Email').val(),Telefono:$('#telefono').val(),Alias:$('#alias').val()}); 			
	         hide();
			 show("messagesDiv"); 

    }
        
	  });
});

})

function show(e)
{
 if($("#Clave").val()!='')
 {
  $("#"+e).show()
  }

  else{
     $("#"+e).hide();
  alert("Debe digitar usuario y clave");}
}
 
  //ocultar objeto
  function hide()
  {
     
	 $("#Login").hide();
     $("#labelMensaje").hide(); 
     $("#messagesDiv").hide();
     $("#nameInput").hide(); 
     $("#Registrousuario").hide();
     $("#listaAmigos").hide();  
     $("#enviarmensaje").hide(); 
     $("#RegistraAmigos").hide(); 
	 
  }
