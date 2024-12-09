from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('shopdetail/', shopdetail, name='shopdetail'),
    path('cart/', cart, name='cart'),
    path('checkout/', checkout, name='checkout'),
    path('contact/', contact, name='contact'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('listaproductos/', listaproductos, name='listaproductos'),
    path('addproductos/', addproductos, name='addproductos'),
    path('updateproductos/<id>/', updateproductos, name='updateproductos'),
    path('deleteproductos/<id>/', deleteproductos, name='deleteproductos'),
    path('validate-login/', validate_login, name='validate-login'),  # Nueva ruta
    path('clear-cart/', clear_cart, name='clear_cart'),
]