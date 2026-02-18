from Crypto.Hash import keccak

def keccak256_file(filepath):
    """Genera el hash Keccak-256 de un archivo"""
    k = keccak.new(digest_bits=256)
    
    # Leer el archivo en bloques para manejar archivos grandes
    with open(filepath, 'rb') as f:
        while True:
            chunk = f.read(8192)  # Lee en bloques de 8KB
            if not chunk:
                break
            k.update(chunk)
    
    return k.hexdigest()

# Ejemplo de uso
archivo = "C:/Users/brand/Documents/Otros/VACA/otros/Carta_Recomendacion2.pdf"
hash_resultado = keccak256_file(archivo)
print(f"Keccak-256: {hash_resultado}")