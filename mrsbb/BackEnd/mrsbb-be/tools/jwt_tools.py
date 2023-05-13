# author: @iamtienng
import jwt
from uuid import uuid4
from datetime import datetime, timedelta


def create_access_token(user_id):
    return jwt.encode({
        "token_type": "access",
        "exp": (datetime.now()+timedelta(days=1)).timestamp().__int__(),
        "jti": uuid4().hex,
        "user_id": user_id
    }, 'secret', algorithm='HS256')


def create_refresh_token(user_id):
    return jwt.encode({
        "token_type": "refresh",
        "exp": (datetime.now()+timedelta(days=1)).timestamp().__int__(),
        "jti": uuid4().hex,
        "user_id": user_id
    }, 'secret', algorithm='HS256')


def create_jwt_token(user_id):
    return {
        "access": create_access_token(user_id),
        "refresh": create_refresh_token(user_id)
    }
