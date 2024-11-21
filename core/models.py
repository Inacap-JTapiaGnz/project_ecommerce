from django.db import models

# Create your models here.

class TipoProducto(models.Model):
    descripcion = models.CharField(max_length=50)

    def __str__(self):
        return self.descripcion
    

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    descripcion = models.CharField(max_length=50)
    stock =  models.IntegerField()
    fecha_vencimiento = models.DateField()
    imgproducto = models.ImageField(blank=True, null=True)
    tipo = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre