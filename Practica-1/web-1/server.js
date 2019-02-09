var http = require('http');
var fs = require ('fs');
var url = require('url');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data){
    if(err){
      res.writeHead(400, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    console.log("Peticion atendida")
  });
}).listen(8080);
