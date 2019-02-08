var http = require('http');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  res.writeHead(400, {'Content-Type': 'text/html'});
  res.end('Hello World!');
  console.log("Peticion atendida")
}).listen(8080);
