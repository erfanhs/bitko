from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Room(models.Model):
    users = models.ManyToManyField(User, related_name="users", blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator")
    room_name = models.CharField(max_length=30)
    password = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.room_name)
    

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="chat")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.author.username
