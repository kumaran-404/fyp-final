"""
ASGI config for api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path,re_path
from camera_feed import routing 
from camera_feed.consumers import CameraFeed

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')


application = ProtocolTypeRouter({
    "http" : get_asgi_application() , 

    "websocket": 
        URLRouter(
             [
                re_path(r'ws/video/(?P<group_name>\w+)/(?P<alias_name>\w+)/$',CameraFeed.as_asgi())
             ]
        )
    ,
})