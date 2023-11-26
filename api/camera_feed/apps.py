from django.apps import AppConfig
from ml.model import get_model

class CameraFeedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'camera_feed'

