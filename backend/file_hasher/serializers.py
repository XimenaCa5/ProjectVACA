from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FileHash

class FileHashSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = FileHash
        fields = [
            'id',
            'usuario',
            'nombre_archivo',
            'archivo',
            'hash_keccak256',
            'fecha_procesamiento',
            'tipo_archivo',
            'tamano_bytes'
        ]
        read_only_fields = [
            'hash_keccak256',
            'fecha_procesamiento',
            'tipo_archivo',
            'tamano_bytes'
        ]

class FileUploadSerializer(serializers.Serializer):
    archivo = serializers.FileField()
    
    def validate_archivo(self, value):
        """Validar tipo y tamaño de archivo"""
        extensiones_validas = ['pdf', 'png', 'jpg', 'jpeg']
        ext = value.name.lower().split('.')[-1]
        
        if ext not in extensiones_validas:
            raise serializers.ValidationError(
                'Solo se permiten archivos PDF o imágenes (PNG, JPG, JPEG)'
            )
        
        # Validar tamaño (10MB máximo)
        if value.size > 10485760:
            raise serializers.ValidationError(
                'El archivo no puede superar los 10MB'
            )
        
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user