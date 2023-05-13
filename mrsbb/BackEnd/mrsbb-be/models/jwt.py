# author: @iamtienng
# import database and secret key
from config import SECRET_KEY
from extensions import db

# import jwt library
import jwt

# import tools
from uuid import uuid4
from datetime import datetime, timedelta


class JWT:
    token = ""
    token_type = ""
    created_at = ""
    expires_at = ""
    user_id = ""
    jti = ""

    # constructor
    def __init__(self, token_type):
        self.created_at = self.create_created_at()
        self.expires_at = self.create_expires_at()
        self.jti = uuid4().hex
        self.token_type = token_type
        self.token = self.create_jwt_token()

    def create_created_at(self):
        return datetime.now().timestamp().__int__()

    def create_expires_at(self):
        return (datetime.now()+timedelta(days=1)).timestamp().__int__()

    # create a jwt token
    def create_jwt_token(self):
        return jwt.encode({
            "token_type": self.token_type,
            "exp": self.expires_at,
            "jti": self.jti,
            "user_id": self.user_id
        }, SECRET_KEY, algorithm='HS256')

    # store the token to the database
    def store_token(self):
        jwtCollection = db[self.token_type]
        jwtDocument = jwtCollection.find({"token": self.token})
        if jwtDocument.count() == 0:
            jwtCollection.insert_one({
                "token": self.token,
                "created_at": self.created_at,
                "expires_at": self.expires_at,
                "user_id": self.user_id,
                "jti": self.jti
            })
            return True
        return False

    # get the token string of the token
    def get_token(self):
        return self.token

    # get the information of the token
    def get_info(self):
        return {
            "token": self.token,
            "created_at": self.created_at,
            "expires_at": self.expires_at,
            "user_id": self.user_id,
            "jti": self.jti
        }

    # get the information of the token from the database
    def get_info_from_db(self):
        jwtCollection = db[self.token_type]
        jwtDocument = jwtCollection.find({"token": self.token})
        if jwtDocument.count() > 0:
            self.created_at = jwtDocument[0]['created_at']
            self.expires_at = jwtDocument[0]['expires_at']
            self.user_id = jwtDocument[0]['user_id']
            self.jti = jwtDocument[0]['jti']
            return True
        return False
