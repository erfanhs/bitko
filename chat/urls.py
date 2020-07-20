from django.urls import path
from django.views.generic.base import RedirectView, TemplateView
from django.conf.urls.static import static
from django.conf import settings

react_template = TemplateView.as_view(template_name='index.html')

urlpatterns = [
    path('', react_template),
    path('room/<str:room_id>/', react_template),
]