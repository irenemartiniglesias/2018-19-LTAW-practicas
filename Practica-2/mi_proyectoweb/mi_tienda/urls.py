from django.conf.urls import url
from . import views

urlpatterns=[
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^moviles/', views.moviles),
    url(r'^order/', views.order),
    url(r'^factura/', views.factura),
]
