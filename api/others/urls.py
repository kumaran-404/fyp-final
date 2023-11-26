from django.urls import path,include
from .views import chatbot_handler , soil_handler 

urlpatterns = [
    path("chatbot/",chatbot_handler),
    path("soil/",soil_handler)
]
