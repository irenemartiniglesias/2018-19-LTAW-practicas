var http = require('http');
var fs = require ('fs');
var url = require('url');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  console.log("---> Petición recibida");
  console.log("Recurso solicitado (URL): " + req.url);

  //-- parseamos la url de forma que nos quedemos con el fichero html, y el host
  var q = url.parse(req.url, true);
  console.log("URL parseada: ");
  console.log("Host: " + q.host);
  console.log("Pathname: " + q.pathname);

  //-- Obtener el fichero. Si es "/" se toma index.html
  //-- Poner el "." delante para que sean un fichero del directorio actual

  var filename = "";

  if (q.pathname == "/")
    filename += "/index.html"
  else {
    filename = q.pathname
  }

  //-- Obtener el tipo de fichero segun la extension
  tipo = filename.split(".")[1]

  //-- Obtener el nombre del fichero a partir del recurso solicitado
  //-- Se añade un . delante
  filename = "." + filename
  console.log("Filename: " + filename)
  console.log("Tipo: " + tipo)

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Tipo mime por defecto: html
    var mime = "text/html"

    //-- Es una imagen
    if (['png', 'jpg'].includes(tipo)) {
      console.log("IMAGEN!!!!!")
      mime = "image/" + tipo
    }

    //-- Es un css
    if (tipo == "css")
      mime = "text/css"

    if (['ogg'].includes(tipo)){
      console.log("VIDEO!!!!!")
      mime = "video/" + tipo
    }

    if (['mp3'].includes(tipo)){
      console.log("AUDIO!!!!!")
      mime = "audio/" + tipo
    }
    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();

  });

}).listen(8080);
