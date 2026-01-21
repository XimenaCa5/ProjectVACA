# views.py
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        tokens = response.data

        res = Response({"detail": "Login OK"})

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
