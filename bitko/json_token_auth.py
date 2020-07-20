from django.db import close_old_connections
from jwt import decode as jwt_decode
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from jwt import InvalidSignatureError, ExpiredSignatureError, DecodeError
import traceback
from channels.auth import AuthMiddlewareStack

User = get_user_model()

@database_sync_to_async
def close_connections():
    close_old_connections()

@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

class TokenAuthMiddlewareInstance:
    """
    Token authorization middleware
    """

    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        await close_connections()

        try:
            token = parse_qs(self.scope["query_string"].decode("utf8"))["token"][0]
        except KeyError:
            return None

        try:
            decoded_data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except (InvalidSignatureError, KeyError, ExpiredSignatureError, DecodeError):
            return None
        
        self.scope['user'] = await get_user(decoded_data['user_id'])

        inner = self.inner(self.scope)
        return await inner(receive, send)

class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))