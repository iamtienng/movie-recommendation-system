# author: @iamtienng
# import database and machine learning model
from extensions import db, mfcf_model

# import models
from models.account import Account

# import tools
from tools.crypto_tools import md5
from tools.regex_tools import isEmailValid
import json


class People(Account):
    name = ""
    surname = ""
    gender = ""
    birth_date = ""

    # register a new user
    def register(self):
        # get the collection of users
        mongoCollection = db[self.type]
        # if the email is valid and the password is longer than 5 characters
        if isEmailValid(self.email) and len(self.password) > 5:
            # check if the email is already used
            myCursor = mongoCollection.find({"email": self.email})
            if (myCursor.count() == 0):
                # find the max id
                latest_user = db[self.type].find_one(sort=[("id", -1)])
                if latest_user is None:
                    # if there is no user, set the id to 6040 (the first id of the user)
                    self.id = 6040
                else:
                    # if there is a user, set the id to the max id + 1
                    self.id = latest_user['id'] + 1
                # encrypt the password
                encryptedPassword = self.password
                for i in range(0, 10):
                    encryptedPassword = md5(encryptedPassword)
                # insert the user to the database
                mongoCollection.insert_one({
                    "name": self.name,
                    "surname": self.surname,
                    "email": self.email,
                    "password": encryptedPassword,
                    "id": self.id,
                    "gender": self.gender,
                    "birth_date": self.birth_date
                })
                # add the user to the machine learning model
                mfcf_model.add_user(self.id)
                return json.dumps(self.get_info())
            else:
                return "Email already exists"
        return False

    # get information of a user
    def get_info(self):
        return {
            "name": self.name,
            "surname": self.surname,
            "gender": self.gender,
            "birth_date": self.birth_date,
            "id": self.id,
            "email": self.email
        }

    # get information of a user from the database
    def get_info_from_db(self):
        mongoCollection = db[self.type]
        mongoCursor = mongoCollection.find({"id": self.id})
        if (mongoCursor.count() > 0):
            self.id = mongoCursor[0]['id']
            self.name = mongoCursor[0]['name']
            self.surname = mongoCursor[0]['surname']
            self.email = mongoCursor[0]['email']
            self.gender = mongoCursor[0]['gender']
            self.birth_date = mongoCursor[0]['birth_date']
            return True
        return False
