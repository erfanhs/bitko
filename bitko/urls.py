from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # admin panel
    path('admin/', admin.site.urls),
    # api
    path('api/v1/', include('chat.api.urls')),
    # site routes
    path('', include('chat.urls'))
]
