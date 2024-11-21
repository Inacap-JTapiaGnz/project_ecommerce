from django.shortcuts import redirect, render
from .models import *
from .forms import *

# Create your views here.

def index(request):

    productos = Producto.objects.all() # select * from producto
    datos = {
        'productos':productos
    }

    return render(request, 'core/index.html', datos)

def login(request):
    return render(request, 'core/login.html')

def shopdetail(request):

    productos = Producto.objects.all() # select * from producto
    datos = {
        'productos':productos
    }

    return render(request, 'core/shopdetail.html', datos)

def cart(request):
    return render(request, 'core/cart.html')

def checkout(request):
    return render(request, 'core/checkout.html')

def contact(request):
    return render(request, 'core/contact.html')

def register(request):
    return render(request, 'core/register.html')

def listaproductos(request):

    productos = Producto.objects.all() # select * from producto
    datos = {
        'productos':productos
    }

    return render(request, 'core/productos/listaproductos.html', datos)


def addproductos(request):

    datos = { 'form': ProductoForm() } # Se crea la instancia del formulario

    if request.method == 'POST':
        formulario = ProductoForm(request.POST, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            datos['mensaje'] = "Producto guardado correctamente"

    return render(request, 'core/productos/addproductos.html', datos)


def updateproductos(request, id):
    
    producto = Producto.objects.get(id=id) # select * from producto where id = id
    datos = {
        'form': ProductoForm(instance=producto)
    }   # Se crea la instancia del formulario

    if request.method == 'POST':
        formulario = ProductoForm(data=request.POST, instance=producto, files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            datos['mensaje'] = "Producto actualizado correctamente"
            datos['form'] = formulario

    return render(request, 'core/productos/updateproductos.html', datos)


def deleteproductos(request, id):

    producto = Producto.objects.get(id=id)
    producto.delete()

    return redirect(to='listaproductos')