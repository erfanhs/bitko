from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from chat.models import Message, Room, User

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
    
    def to_representation(self, obj):
        data = super().to_representation(obj)
        data['author'] = obj.author.username
        return data


class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        data.update({'username': self.user.username, 'id': self.user.id})
        return data