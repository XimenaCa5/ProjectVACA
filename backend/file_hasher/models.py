from django.db import models
from django.contrib.auth.models import User

class FileHash(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='file_hashes')
    nombre_archivo = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='uploads/%Y/%m/%d/')
    hash_keccak256 = models.CharField(max_length=64, db_index=True)
    fecha_procesamiento = models.DateTimeField(auto_now_add=True)
    tipo_archivo = models.CharField(max_length=10)  # pdf, png, jpg, jpeg
    tamano_bytes = models.BigIntegerField()
    
    class Meta:
        verbose_name = 'Hash de Archivo'
        verbose_name_plural = 'Hashes de Archivos'
        ordering = ['-fecha_procesamiento']
        indexes = [
            models.Index(fields=['-fecha_procesamiento']),
            models.Index(fields=['usuario', '-fecha_procesamiento']),
        ]
    
    def __str__(self):
        return f"{self.nombre_archivo} - {self.hash_keccak256[:16]}..."