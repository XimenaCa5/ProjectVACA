from Crypto.Hash import keccak

def calcular_hash_keccak256(archivo):
    """
    Calcula el hash Keccak256 de un archivo
    
    Args:
        archivo: FileField de Django
        
    Returns:
        str: Hash hexadecimal
    """
    k = keccak.new(digest_bits=256)
    
    # Resetear puntero del archivo
    archivo.seek(0)
    
    # Leer el archivo en chunks para archivos grandes
    for chunk in archivo.chunks(chunk_size=8192):
        k.update(chunk)
    
    # Resetear puntero nuevamente
    archivo.seek(0)
    
    return k.hexdigest()

def obtener_tipo_archivo(nombre_archivo):
    """Obtiene la extensión del archivo"""
    return nombre_archivo.lower().split('.')[-1]