from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password

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
    

class Direccion(models.Model):
    direccion1 = models.CharField(max_length=100)
    direccion2 = models.CharField(max_length=100, blank=True, null=True)
    region = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=50)
    comuna = models.CharField(max_length=50)
    codigo_postal = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.direccion1}, {self.ciudad}, {self.region}"
    

class Usuario(models.Model):
    primer_nombre = models.CharField(max_length=50)
    segundo_nombre = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  # Contraseña encriptada
    direccion = models.OneToOneField(Direccion, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)  # Encripta la contraseña
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email