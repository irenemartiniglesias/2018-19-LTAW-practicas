var http = require('http');
var fs = require ('fs');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  fs.readFile('libros.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    console.log("Peticion atendida")
  });
}).listen(8080);
