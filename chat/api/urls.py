from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView
from .views import signup, login, getMessages, createRoom, getRooms, DeleteAccount, ChangePassword, joinRoom

# api endpoints

urlpatterns = [
    path('auth/signup/', signup),
    path('auth/login/', login.as_view()),
    path('auth/refreshToken/', TokenRefreshView.as_view()),

    path('messages-list/', getMessages),
    path('create-room/', createRoom),
    path('join-room/', joinRoom),
    path('get-rooms/', getRooms),

    path('delete-account/', DeleteAccount),
    path('change-password/', ChangePassword),
]