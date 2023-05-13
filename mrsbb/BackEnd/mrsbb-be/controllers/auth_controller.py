# author: @iamtienng
# import flask dependencies
from flask import Blueprint, request

# import models
from models.user import User
from models.account import Account

# import tools
import json

# define the blueprint: 'auth', set its url prefix: app.url/auth
auth_bp = Blueprint('auth_bp', __name__)


# check authorization of user
@auth_bp.route("/jwt/verify/", methods=['POST'])
def verify_auth():
    try:
        # token to authorize will located in the request body as json
        data = request.get_json()
        status = Account.verify_auth(data['token'])
        # if the token is valid, the function will return 200
        if (status):
            return "", 200
        else:
            return "Verification failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# load user information
@auth_bp.route("/users/me/", methods=['GET'])
def load_user():
    try:
        # token to authorize will located in the request header as 'Authorization'
        # an user object will be created with the id of the user
        accessToken = request.headers.get('Authorization')[4:]
        userId = Account.get_id(accessToken)
        # if the user is found in the database, the information will be loaded
        if (userId != False):
            user = User()
            user.id = userId
            if (user.get_info_from_db()):
                return json.dumps(user.get_info()), 200
            return "User not found", 404
        return "Loading infomation failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# login function for user
@auth_bp.route("/jwt/create/", methods=['POST'])
def login():
    try:
        # an user object will be created with the email and password of the user
        # if the user is found in the database, parent class function login will be called
        # which will create a jwt token and return it
        userdata = request.get_json()
        user = User()
        user.email = userdata['email']
        user.password = userdata['password']
        result = user.login()
        if result == False:
            return "Login failed due to bad credentials", 403
        else:
            return result, 200
    except:
        return "Unexpected Error", 500


# signup function for user
@auth_bp.route("/users/", methods=['POST'])
def signup():
    try:
        # an user object will be created with the information of the user
        # if the user is not found in the database, parent class function register will be called
        # which will create a new user and return the 200 status code
        userdata = request.get_json()
        user = User()
        user.name = userdata['first_name']
        user.surname = userdata['last_name']
        user.email = userdata['email']
        user.password = userdata['password']
        user.gender = userdata['gender']
        user.birth_date = userdata['birth_date']

        if userdata['password'] != userdata['re_password']:
            return "Passwords do not match", 409
        else:
            result = user.register()
            if result == False:
                return "Signup failed", 409
            elif result == "Email already exists":
                return "Email already exists", 409
            else:
                return result, 200
    except:
        return "Unexpected Error", 500
