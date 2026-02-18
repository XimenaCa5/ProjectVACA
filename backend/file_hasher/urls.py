from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FileHashViewSet,
)

router = DefaultRouter()
router.register(r'hashes', FileHashViewSet, basename='filehash')

urlpatterns = [
    path('', include(router.urls)),
]