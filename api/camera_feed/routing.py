# video/routing.py
from django.urls import re_path, path
from .consumers import CameraFeed

websocket_urlpatterns = [
    path("/ws/video/" , CameraFeed.as_asgi()),
]