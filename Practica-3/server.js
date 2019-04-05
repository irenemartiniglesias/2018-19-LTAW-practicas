var http = require('http');
var fs = require ('fs');
var url = require('url');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  console.log("---> Petición recibida");
  console.log("Recurso solicitado (URL): " + req.url);

  var q = url.parse(req.url, true);
  console.log("URL parseada: ");
  console.log("Host: " + q.host);
  console.log("Pathname: " + q.pathname);

  //-- Obtener el fichero. Si es "/" se toma index.html
  //-- Poner el "." delante para que sean un fichero del directorio actual

  var filename = "";

  if (q.pathname == "/")
    filename += "/index.html"
  else if(q.pathname =="/form1.html") {
    filename = q.pathname
    //iniciar cookie
    var cookie = req.headers.cookie;
    console.log("Cookie: " + cookie)
    //-- ESTABLECER LA COOKIE!!
    res.setHeader('Set-Cookie', 'user=irenemartin')
  }else if(q.pathname =="/myform.html"){
    if (req.method === 'POST') {
        // Handle post info...

        var content = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8">
            <title>RESUMEN COMPRA</title>
            <link rel="stylesheet" href="/css/micss.css">
          </head>
          <body>
            <p>Tu pedido se ha realizado con éxito, a continuación se muestran los datos recibidos</p>
            <br/>
            <p>Recibido: `

        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();

            //-- Añadir los datos a la respuesta
            content += data;

            //-- Fin del mensaje. Enlace al formulario
            content += `
                </p>
                <a href="/">[Página Principal]</a>
              </body>
            </html>
            `
            //-- Mostrar los datos en la consola del servidor
            console.log("Datos recibidos: " + data)
            res.statusCode = 200;
         });

         req.on('end', ()=> {
           //-- Generar el mensaje de respuesta
           res.setHeader('Content-Type', 'text/html')
           res.write(content);
           res.end();
         })
         return
      }
  }else{
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

    if (['mp4'].includes(tipo)){
      console.log("VIDEO!!!!!")
      mime = "video/" + tipo
    }
    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();

  });

}).listen(8080);
