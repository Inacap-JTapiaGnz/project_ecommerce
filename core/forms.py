from django import forms
from django.forms import ModelForm
from .models import *

# Create templates for the forms

class ProductoForm(ModelForm):

    # Campos de validacion

    # Se define los campos del formulario
    class Meta:
        model = Producto
        fields = ['nombre', 'precio', 'descripcion', 'stock', 'fecha_vencimiento', 'imgproducto', 'tipo']

        # Se define los widgets
        widgets = {
            'fecha_vencimiento': forms.SelectDateWidget(years=range(2021, 2030))
        }

class DireccionForm(forms.ModelForm):
    class Meta:
        model = Direccion
        fields = '__all__'

class UsuarioForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Usuario
        fields = ['primer_nombre', 'segundo_nombre', 'email', 'telefono', 'password', 'direccion']