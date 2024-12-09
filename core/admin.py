from django.contrib import admin
from .models import *

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'precio', 'descripcion', 'stock', 'fecha_vencimiento', 'imgproducto', 'tipo']
    search_fields = ['nombre']
    list_per_page = 10

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('primer_nombre', 'email', 'telefono')  # Campos que deseas mostrar
    search_fields = ('email', 'primer_nombre')  # Campos para el buscador

class DireccionAdmin(admin.ModelAdmin):
    list_display = ('direccion1', 'ciudad', 'region', 'comuna')  # Campos que deseas mostrar
    search_fields = ('direccion1', 'ciudad')  # Campos para el buscador

# Register your models here.
admin.site.register(TipoProducto)
admin.site.register(Producto)
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Direccion, DireccionAdmin)