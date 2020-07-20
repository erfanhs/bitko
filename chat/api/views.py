from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from password_strength import PasswordStats
import re
from hashlib import md5, sha1
from chat.models import Room, Message
from .serializers import MessageSerializer, RoomSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


User = get_user_model()

username_validator = re.compile(r'^[a-zA-Z][a-zA-Z0-9]{2,15}$')
roomName_validator = username_validator



#######################
######## UTILS ########
#######################


def roomsPasswordHasher(password):
    return sha1(md5(password.encode('utf8')).hexdigest().encode('utf8')).hexdigest()



##########################
####### USER VIEWS #######
##########################



@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username:
        return Response({'error': 'username is required !'}, status=400)
    if not password:
        return Response({'error': 'password is required !'}, status=400)
    if not username_validator.search(username):
        return Response({'error': "invalid username !"}, status=400)
    stats = PasswordStats(password)
    if stats.strength() < 0.250:
        return Response({'error': 'Weak password !'}, status=400)
    try:
        User.objects.get(username=username)
        return Response({'error': 'That username is already taken !'}, status=400)
    except User.DoesNotExist:
        User.objects.create(username=username, password=make_password(password))
    return Response({'username': username})



class login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def DeleteAccount(request):
    user = request.user
    password = request.data.get('password')
    if not password:
        return Response({'error': 'password is required !'}, status=400)
    if not authenticate(username=user.username, password=password):
        return Response({'error': 'password is incorrect !'}, status=400)
    user.delete()
    return Response({'response': 'your account deleted successfully.'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ChangePassword(request):
    user = request.user
    old_password = request.data.get('opassword')
    new_password = request.data.get('npassword')
    if not old_password: 
        return Response({'error': 'old password is required !'}, status=400)
    if not new_password:
        return Response({'error': 'new password is required !'}, status=400)
    if not authenticate(username=user.username, password=old_password):
        return Response({'error': 'password is incorrect !'}, status=400)
    stats = PasswordStats(new_password)
    if stats.strength() < 0.250:
        return Response({'error': 'Weak password !'}, status=400)
    user.password = make_password(new_password)
    user.save()
    return Response({'response': 'your password changed successfully.'})




##########################
####### CHAT VIEWS #######
##########################



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRooms(request):
    user = request.user
    rooms = Room.objects.filter(users__username=user.username)
    serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMessages(request):
    user = request.user
    room_id = request.GET.get('room_id')
    if not room_id:
        return Response({'error': 'room id is required !'}, status=400)
    try:
        room = Room.objects.get(id=room_id)
    except Room.DoesNotExist:
        return Response({'error': 'room not found !'}, status=404)
    try: 
        room.users.get(id=user.id)
    except User.DoesNotExist:
        return Response({'error': "you can't get this room messages !"})
    messages = Message.objects.filter(room=room)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoom(request):
    user = request.user
    room_name = request.data.get('room_name')
    password = request.data.get('room_password')
    if not room_name:
        return Response({'error': 'room name is required !'}, status=400)
    if not roomName_validator.search(room_name):
        return Response({'error': 'invalid room name !'}, status=400)
    try:
        Room.objects.get(room_name=room_name)
        return Response({'error': 'this room name is already taken !'}, status=400)
    except Room.DoesNotExist:
        room = Room(room_name=room_name)
        if password:
            if len(password) < 6:
                return Response({'error': 'password must be more than 5 characters !'}, status=400)
            room.password = roomsPasswordHasher(password)
        room.creator = user
        room.save()
        room.users.add(user)
        room.save()
    serializer = RoomSerializer(room)
    print(serializer.data)
    return Response(serializer.data)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def joinRoom(request):
    user = request.user
    room_name = request.data.get('room_name')
    room_id = request.data.get('room_id')
    password = request.data.get('password')
    try:
        if room_name:
            room = Room.objects.get(room_name=room_name)
        elif room_id:
            room = Room.objects.get(id=room_id)
        else:
            return Response({'error': 'room_id or room_name please !'}, status=400)
    except Room.DoesNotExist:
        return Response({'error': 'room not found !'}, status=404)
    try:
        room.users.get(id=user.id)
    except User.DoesNotExist:
        if room.password:
            if not password:
                return Response({'error': 'password ?'}, status=400)
            if room.password != roomsPasswordHasher(password):
                return Response({'error': 'password is incorrect !'}, status=403)
        room.users.add(user)
        room.save()
    serializer = RoomSerializer(room)
    return Response(serializer.data)




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @parser_classes([MultiPartParser])
# def setProfilePic(request):
#     user = request.user

#     file_obj = request.data['file']
#     profilePic = ProfilePicture.objects.filter(user=user)
#     if profilePic:
#         profilePic.update(pic=file_obj)
#     else:
#         ProfilePicture.objects.create(user=user, pic=file_obj)

#     return Response({'response': 'uploaded'}, status=204)



