from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth.models import User
from .models import FileHash
from .serializers import (
    FileHashSerializer,
    FileUploadSerializer,
    UserSerializer,
    UserRegistrationSerializer
)
from .utils import calcular_hash_keccak256, obtener_tipo_archivo

class FileHashViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar hashes de archivos
    
    list: Listar todos los hashes del usuario autenticado
    retrieve: Obtener detalle de un hash específico
    create: Subir archivo y generar hash
    destroy: Eliminar registro de hash
    """
    serializer_class = FileHashSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Retornar solo los hashes del usuario autenticado"""
        return FileHash.objects.filter(usuario=self.request.user)
    
    def create(self, request, *args, **kwargs):
        """Procesar archivo y crear registro con hash"""
        upload_serializer = FileUploadSerializer(data=request.data)
        
        if not upload_serializer.is_valid():
            return Response(
                upload_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        archivo = upload_serializer.validated_data['archivo']
        
        # Calcular hash
        hash_resultado = calcular_hash_keccak256(archivo)
        
        # Crear registro
        file_hash = FileHash.objects.create(
            usuario=request.user,
            nombre_archivo=archivo.name,
            archivo=archivo,
            hash_keccak256=hash_resultado,
            tipo_archivo=obtener_tipo_archivo(archivo.name),
            tamano_bytes=archivo.size
        )
        
        serializer = self.get_serializer(file_hash)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def buscar_por_hash(self, request):
        """Buscar registros por hash específico"""
        hash_value = request.query_params.get('hash', None)
        
        if not hash_value:
            return Response(
                {'error': 'Parámetro hash es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        file_hashes = self.get_queryset().filter(hash_keccak256=hash_value)
        serializer = self.get_serializer(file_hashes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """Obtener estadísticas del usuario"""
        queryset = self.get_queryset()
        
        return Response({
            'total_archivos': queryset.count(),
            'por_tipo': {
                'pdf': queryset.filter(tipo_archivo='pdf').count(),
                'png': queryset.filter(tipo_archivo='png').count(),
                'jpg': queryset.filter(tipo_archivo='jpg').count(),
                'jpeg': queryset.filter(tipo_archivo='jpeg').count(),
            },
            'ultimo_procesamiento': queryset.first().fecha_procesamiento if queryset.exists() else None
        })

class UserRegistrationView(generics.CreateAPIView):
    """Registro de nuevos usuarios"""
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'user': response.data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)

class CustomAuthToken(ObtainAuthToken):
    """Login personalizado que retorna token y datos de usuario"""
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

class UserProfileView(generics.RetrieveAPIView):
    """Obtener perfil del usuario autenticado"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user