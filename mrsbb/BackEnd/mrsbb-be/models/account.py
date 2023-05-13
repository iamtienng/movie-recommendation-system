# author: @iamtienng
# import database
from extensions import db

# import models
from models.jwt import JWT

# import tools
from tools.crypto_tools import md5
from tools.regex_tools import isEmailValid
from datetime import datetime
import json


class Account:
    id = 0
    password = ""
    email = ""
    type = ""

    # login function
    def login(self):
        # deoend on if it is a user or an admin, get the corresponding collection from the database
        mongoCollection = db[self.type]
        # check if the email is valid and the password is longer than 5 characters
        if isEmailValid(self.email) and len(self.password) > 5:
            # find the document with the email
            myDoc = mongoCollection.find({"email": self.email})
            # if the document exists
            if (myDoc.count() > 0):
                # encrypt the password
                encryptedPassword = self.password
                for i in range(0, 10):
                    encryptedPassword = md5(encryptedPassword)
                # if the password is correct
                if encryptedPassword == myDoc[0]['password']:
                    # create a new refresh token and an access token
                    refreshJWT = JWT("refresh")
                    refreshJWT.user_id = int(myDoc[0]['id'].__str__())
                    accessJWT = JWT("access")
                    accessJWT.user_id = int(myDoc[0]['id'].__str__())
                    # store the tokens in the database
                    if refreshJWT.store_token() and accessJWT.store_token():
                        # return the tokens if the storing is successful
                        return json.dumps({
                            "refresh": refreshJWT.get_token(),
                            "access": accessJWT.get_token()
                        })
        return False

    # verify the authorization
    def verify_auth(token):
        # create a JWT object with the token
        jwt = JWT("access")
        jwt.token = token
        # get the information from the database
        if (jwt.get_info_from_db()):
            # if the token is not expired
            if datetime.now().timestamp().__int__() < jwt.expires_at:
                return True
        return False

    # get the id from the token
    def get_id(token):
        # create a JWT object with the token
        jwt = JWT("access")
        jwt.token = token
        # get the information from the database
        if (jwt.get_info_from_db()):
            # if the token is not expired
            if datetime.now().timestamp().__int__() < jwt.expires_at:
                return int(jwt.user_id)
        return False
