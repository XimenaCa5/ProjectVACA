from django.contrib import admin
from .models import FileHash

@admin.register(FileHash)
class FileHashAdmin(admin.ModelAdmin):
    list_display = (
        'nombre_archivo',
        'usuario',
        'hash_keccak256_corto',
        'tipo_archivo',
        'tamano_mb',
        'fecha_procesamiento'
    )
    list_filter = ('tipo_archivo', 'fecha_procesamiento', 'usuario')
    search_fields = ('nombre_archivo', 'hash_keccak256', 'usuario__username')
    readonly_fields = ('fecha_procesamiento', 'hash_keccak256', 'tamano_bytes')
    date_hierarchy = 'fecha_procesamiento'
    
    def hash_keccak256_corto(self, obj):
        return f"{obj.hash_keccak256[:16]}..."
    hash_keccak256_corto.short_description = 'Hash'
    
    def tamano_mb(self, obj):
        return f"{obj.tamano_bytes / 1048576:.2f} MB"
    tamano_mb.short_description = 'Tamaño'