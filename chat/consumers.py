import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json
from urllib.parse import parse_qs
from django.contrib.auth import get_user_model
from .models import Room, Message
from .api.serializers import MessageSerializer
from .api.views import roomsPasswordHasher


User = get_user_model()

class RoomConsumer(WebsocketConsumer):

    users = {} # online users

    def new_message(self, data):
        message = Message.objects.create(
            room = self.room,
            text = data['message'],
            author = self.user
            )
        serializer = MessageSerializer(message)
        content = {
            'command': 'new_message',
            'message': serializer.data
        }
        
        self.send_chat_message(content)

    commands = {
        'new_message': new_message
    }

    def send_error(self, error_message):
        self.accept()
        self.send_message({'error': error_message})
        self.close()


    def connect(self):
        room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'chat_' + room_id
        user = self.scope['user']
        try:
            room = Room.objects.get(id=room_id)
            try:
                room.users.get(id=user.id)
                async_to_sync(self.channel_layer.group_add)(
                    self.room_group_name,
                    self.channel_name
                )
                self.room = room
                self.user = user
                self.accept()
                try:
                    if user.username not in self.users[room_id]:
                        self.users[room_id].append(user.username)
                except KeyError:
                    self.users[room_id] = [user.username]
                self.send_chat_message({
                    'command': 'online_users',
                    'users': self.users[room_id],
                    'members': room.users.count()
                })
            except User.DoesNotExist:
                self.send_error('You are not a member of this room !')
        except Room.DoesNotExist:
            self.send_error('404 | Room Not Found !')
        

    def disconnect(self, close_code):
        self.users[str(self.room.id)].remove(self.user.username)
        self.send_chat_message({
            'command': 'online_users',
            'users': self.users[str(self.room.id)],
            'members': self.room.users.count()
        })
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )


    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)
    

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))


    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))