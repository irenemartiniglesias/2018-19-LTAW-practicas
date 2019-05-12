from django.conf.urls import url
from . import views

urlpatterns=[
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^moviles/', views.moviles),
    url(r'^order/', views.contact),
    url(r'^bdpedido/', views.basedato_pedido),
    url(r'^factura/', views.factura),
    url(r'^iphonexs/', views.iphonexs),
    url(r'^iphonexr/', views.iphonexr),
    url(r'^iphone8plus/', views.iphone8plus),
    url(r'^samsungs9/', views.samsungs9),
    url(r'^samsunga9/', views.samsunga9),
    url(r'^huaweimate20/', views.huaweimate20),
]
