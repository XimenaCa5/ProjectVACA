# views.py
from django.contrib.auth.models import User

from rest_framework.permissions import AllowAny

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView


class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        tokens = response.data

        res = Response({
            "detail": "Login OK",
            "access": tokens["access"],
            "refresh": tokens["refresh"],  # opcional
        })

        res.set_cookie(
            key="access_token",
            value=tokens["access"],
            httponly=True,
            secure=False,        # True en producción (HTTPS)
            samesite="Lax",
            max_age=60 * 15      # 15 min
        )

        res.set_cookie(
            key="refresh_token",
            value=tokens["refresh"],
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=60 * 60 * 24  # 1 día
        )

        return res


class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Campos obligatorios"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"detail": "El usuario ya existe"},
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        return Response(
            {"detail": "Usuario registrado correctamente"},
            status=status.HTTP_201_CREATED
        )


class UsersListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        users = User.objects.all().values(
            "id",
            "username",
            "email",
            "is_active",
            "is_staff"
        )
        return Response(users)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        user = User.objects.get(pk=pk)

        user.username = request.data.get("username", user.username)
        user.email = request.data.get("email", user.email)
        user.save()

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })
