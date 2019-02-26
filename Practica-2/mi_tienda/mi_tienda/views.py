from django.http import HttpResponse
from django.template import Template, Context

def index(request):
    fp = open('\Users\Irene\Documents\isam\cuarto isam\LTAW\2018-19-LTAW-practicas\Practica-2\mi_tienda\template\main.html')
    t = Template(fp.read())
    fp.close()
    c = Context({'user': 'Imartini'})
    html = t.render(c)
    return HttpResponse(html)

def mi_funcion(request):
	html = "Hola! Mi primera UrL!!"

	return HttpResponse(html)

def mi_producto(request, param):
	numero = int(param)
	html = "Acesso a producto: %i" % numero;
	return HTTPResponse(html)

PLANTILLA = """
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Saludo</title>
  </head>
  <body>
    <p>Bienvenido a mi tienda, {{user}}</p>
  </body>
</html>
"""

def saludo(request):
    # --Procesar la plantilla
    t = Template(PLANTILLA)

    # -- Crear el contexto: Nombre de usuario real
    c = Context({'user':'Epic Saxo guy'})

    # -- Obtener la pagina html final
    html = t.render(c)
    return HttpResponse(html)
