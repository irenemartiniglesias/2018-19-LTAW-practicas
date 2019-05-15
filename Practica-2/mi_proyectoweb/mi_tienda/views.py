# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from mi_tienda.forms import ContactForm

from .models import Product
from .models import Pedido

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})

def moviles(request):
    return render(request, "moviles.html", {})

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        print("Holiiiii")
        if form.is_valid():
            elem= form.cleaned_data
            print(elem)
            pedido = Pedido(nombre=elem['nombre'],movil=elem['movile'],email=elem['mail'],direccion=elem['direccion'],mensaje=elem['mensaje'])
            pedido.save()
            print('guardo en bd')
            #send_mail(cd['subject'], cd ['movile'], cd['message'])
            #form.save()
            return HttpResponseRedirect('/factura')
    else:
        form = ContactForm()
    return render(request, 'formulario.html', {'form': form})

def factura(request):
    return render(request, "factura.html", {})

def basedato_pedido(request):
    pedido = []
    html = "<h1>Lista de Pedidos</h1>"
    objects = Pedido.objects.all()
    print(objects)
    for elem in objects:
        pedido.append(elem);
        print(elem.nombre)
    return render(request,'bd_pedido.html',{'lista':pedido})

def iphonexs(request):
    return render(request, "iphone-xs.html", {})

def iphonexr(request):
    return render(request, "iphonexr.html", {})

def iphone8plus(request):
    return render(request, "iphone8.html", {})

def samsungs9(request):
    return render(request, "sasumgs9.html", {})

def samsunga9(request):
    return render(request, "sasumga9.html", {})

def huaweimate20(request):
    return render(request, "huaweimate20.html", {})

def list(request):
    objects = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + " stock: " + str(elt.stock)+ " precio: "+ str(elt.price) + '<p>'
    return HttpResponse(html)
