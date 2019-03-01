# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def home_view (request):
    return render(request, "index.html", {})
