const express = require('express')
const app = express()
const http = require('http').Server(app);

//-- Puerto donde lanzar el servidor
const PORT = 3000

//-- Punto de entrada pricipal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("/index.html")
});

app.get('/chat-clients.js', function(req, res){
  res.sendFile(__dirname + '/chat-clients.js');
  console.log("Fichero js solicitado")
});

app.get('/woala', (req, res) => {
  res.send('WOALA!!! Chuck Norris approved!!! :-)')
  console.log('Acceso a /woala')
});

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});
