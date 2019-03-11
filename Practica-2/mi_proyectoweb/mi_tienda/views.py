# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.models import Product

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})

def moviles(request):
    return render(request, "moviles.html", {})

def order(request):
    return render(request, "order.html", {})

def factura(request):
    return render(request, "factura.html", {})

def list(request):
    objects = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + " stock: " + str(elt.stock)+ " precio: "+ str(elt.price) + '<p>'
    return HttpResponse(html)
