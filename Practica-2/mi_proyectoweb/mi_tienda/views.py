# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from mi_tienda.forms import ContactForm
from mi_tienda.models import Product

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})

def moviles(request):
    return render(request, "moviles.html", {})

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            #send_mail(cd['subject'], cd ['movile'], cd['message'])
            return HttpResponseRedirect('/factura/')
    else:
        form = ContactForm()
    return render(request, 'formulario.html', {'form': form})

def factura(request):
    return render(request, "factura.html", {})

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
