from django.contrib import admin
from .models import *

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'precio', 'descripcion', 'stock', 'fecha_vencimiento', 'imgproducto', 'tipo']
    search_fields = ['nombre']
    list_per_page = 10

# Register your models here.
admin.site.register(TipoProducto)
admin.site.register(Producto)