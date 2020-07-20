from django.urls import path

from .consumers import RoomConsumer

websocket_urlpatterns = [
    path('ws/method/chat/<str:room_id>/', RoomConsumer)
]