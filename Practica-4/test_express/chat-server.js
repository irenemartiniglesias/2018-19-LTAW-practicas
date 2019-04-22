var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//--Numero de usuarios conectados
var usuario = 0;
var resp_hello ="";
var resp_list = "";
var res_date = "";
var res_help = "";

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-clients.js', function(req, res){
  res.sendFile(__dirname + '/chat-clients.js');
  console.log("Fichero js solicitado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  //-- Aumenta el numero de usuarios cada vez que se abre una pestaña
  usuario = usuario + 1;
  //-- Respuesta del servidor
  respuesta = '<p>Server: Ya estas dentro, bienvenido!</p>'
  socket.emit('new_message', respuesta);
  envia_respuesta = '<p>Server: Nuevo miembro conectado</p>'
  io.emit('new_message', envia_respuesta);

  //-- Detectar si el usuario se ha desconectado
 socket.on('disconnect', function(){
   console.log('--> Usuario Desconectado');
   usuario = usuario - 1;
 });

 //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {
    if(msg == '/help'){
      res_help = '<br>Lista de comandos permitida: </br>' +
      '<ul>'+
      '<li>/help</li>'+
      '<li>/list</li>'+
      '<li>/hello</li>'+
      '<li>/date</li>'+
      '</ul>'
      socket.emit('new_menssage', res_help);
      console.log("/help detectado");
      io.emit('new_message', res_help);
    }else if(msg == '/list'){
      resp_list = '<p>Server: el numero de usuarios actuales es:' + usuario + '</p>';
      socket.emit('new_menssage', resp_list);
      console.log("/list detectado");
      io.emit('new_message', resp_list);
    }else if(msg == '/hello'){
      resp_hello == '<p>Server:'+' Hola </p>';
      socket.emit('new_menssage', resp_hello);
      console.log("/hello detectado");
      io.emit('new_message', resp_hello);
    }else if(msg == '/date'){
      var fecha = new Date();
      resp_date = '<p>Server: ' + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear() +'</p>';
      socket.emit('new_menssage', resp_date)
      console.log("/date detectado");
      io.emit('new_message', resp_date);
    }else{
      //-- Notificarlo en la consola del servidor
       console.log("Mensaje recibido: " + msg)
      //-- Emitir un mensaje a todos los clientes conectados
       io.emit('new_message', msg);
    }
 });

});
