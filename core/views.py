from pyexpat.errors import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from django.contrib.auth.decorators import login_required
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
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        try:
            usuario = Usuario.objects.get(email=email)
            if usuario.check_password(password):  # Si la contraseña coincide
                request.session["user_email"] = usuario.email  # Guardar email en la sesión
                return redirect("checkout")  # Redirigir a la página de checkout
            else:
                messages.error(request, "Contraseña incorrecta.")
        except Usuario.DoesNotExist:
            messages.error(request, "El usuario no existe.")
    
    return render(request, "core/login.html")

def shopdetail(request):

    productos = Producto.objects.all() # select * from producto
    datos = {
        'productos':productos
    }

    return render(request, 'core/shopdetail.html', datos)

def cart(request):
    return render(request, 'core/cart.html')


def checkout(request):
    user_email = request.session.get("user_email")
    usuario = None

    if user_email:
        try:
            usuario = Usuario.objects.get(email=user_email)
        except Usuario.DoesNotExist:
            usuario = None

    print("Usuario:", usuario)  # Depuración para ver qué usuario se está pasando
    return render(request, "core/checkout.html", {"usuario": usuario})

def contact(request):
    return render(request, 'core/contact.html')

def register(request):

    if request.method == 'POST':
        direccion_form = DireccionForm(request.POST)
        usuario_form = UsuarioForm(request.POST)

        if direccion_form.is_valid() and usuario_form.is_valid():
            direccion = direccion_form.save()
            usuario = usuario_form.save(commit=False)
            usuario.direccion = direccion
            usuario.save()
            return redirect('index')  # Redirige al index después de registrar

    else:
        direccion_form = DireccionForm()
        usuario_form = UsuarioForm()

    return render(request, 'core/register.html', {'direccion_form': direccion_form, 'usuario_form': usuario_form})

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

def validate_login(request):
    if request.method == "POST":
        import json
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        try:
            usuario = Usuario.objects.get(email=email)
            if check_password(password, usuario.password):  # Validar contraseña encriptada
                request.session["user_email"] = email  # Guardar email en la sesión
                return JsonResponse({"valid": True})
            else:
                return JsonResponse({"valid": False, "error": "Contraseña incorrecta"})
        except Usuario.DoesNotExist:
            return JsonResponse({"valid": False, "error": "Usuario no encontrado"})
    return JsonResponse({"valid": False, "error": "Método no permitido"}, status=405)

def clear_cart(request):
    request.session['cart'] = []
    return JsonResponse({"message": "Carrito limpio"})