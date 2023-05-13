# author: @iamtienng
# import flask dependencies
from flask import Blueprint, jsonify, request

# import models
from models.user import User
from models.movie import Movie
from models.account import Account
from models.admin import Admin

# import tools
import json

# define the blueprint: 'auth', set its url prefix: app.url/auth
admin_bp = Blueprint('admin_bp', __name__)


# check authorization of admin
@admin_bp.route("/jwt/verify/", methods=['POST'])
def verify_auth():
    try:
        # token to authorize will located in the request body as json
        data = request.get_json()
        status = Admin.verify_auth(data['token'])
        if (status):
            return "", 200
        else:
            return "Verification failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# load admin information
@admin_bp.route("/me/", methods=['GET'])
def load_user():
    try:
        # token to authorize will located in the request header as 'Authorization'
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # an admin object will be created with the id of the admin
        # if the admin is found in the database, the information will be loaded
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            if (admin.get_info_from_db()):
                return json.dumps(admin.get_info()), 200
            return "User not found", 404
        return "Loading infomation failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# login function for admin
@admin_bp.route("/jwt/create/", methods=['POST'])
def login():
    try:
        # an admin object will be created with the email and password of the admin
        # if the admin is found in the database, parent class function login will be called
        # which will create a jwt token and return it
        admin_data = request.get_json()
        admin = Admin()
        admin.email = admin_data['email']
        admin.password = admin_data['password']
        result = admin.login()
        if result == False:
            return "Login failed due to bad credentials", 403
        else:
            return result, 200
    except:
        return "Unexpected Error", 500


# get all users in the database (admin only)
@admin_bp.route("/users/", methods=['GET'])
def get_users():
    try:
        # token to authorize will located in the request header as 'Authorization'
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # an admin object will be created with the id of the admin
        # if the admin is found in the database, the information about users will be loaded
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            usersList = admin.get_all_users()
            if len(usersList) > 0:
                return jsonify(usersList), 200
            return [], 404
        return "Loading infomation failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# get a user in the database (admin only)
@admin_bp.route("/users/<int:user_id>/", methods=['GET'])
def get_user(user_id):
    try:
        # token to authorize will located in the request header as 'Authorization'
        # an admin object will be created with the id of the admin
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # if the admin is found in the database, the information about the user will be loaded
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            user = User()
            user.id = user_id
            result = admin.get_user(user)
            if result is not False:
                return jsonify(result), 200
            return "User not found", 404
        return "Loading infomation failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# delete a user in the database (admin only)
@admin_bp.route("/users/<int:user_id>/", methods=['DELETE'])
def delete_user(user_id):
    try:
        # token to authorize will located in the request header as 'Authorization'
        # an admin object will be created with the id of the admin
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # if the admin is found in the database, the user will be deleted
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            user = User()
            user.id = user_id
            result = admin.delete_user(user)
            if result is not False:
                return "", 200
            return "User not found", 404
        return "Delete user failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# get all movies in the database (admin only)
@admin_bp.route("/movies/", methods=['GET'])
def get_movies():
    try:
        # token to authorize will located in the request header as 'Authorization'
        # an admin object will be created with the id of the admin
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # if the admin is found in the database, the information about movies will be loaded
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            moviesList = admin.get_all_movies()
            if len(moviesList) > 0:
                return jsonify(moviesList), 200
            return "Movies not found", 404
        return "Loading infomation failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# get a movie in the database (admin only)
@admin_bp.route("/movies/<int:movie_id>/", methods=['GET'])
def get_movie(movie_id):
    try:
        # token to authorize will located in the request header as 'Authorization'

        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # if the admin is found in the database, the information about the movie will be loaded
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            movie = Movie()
            movie.movieId = movie_id
            result = admin.get_movie(movie).get_info()
            if result is not False:
                return jsonify(result), 200
            return "Movie not found", 404
        return "Loading infomation failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# delete a movie in the database (admin only)
@admin_bp.route("/movies/<int:movie_id>/", methods=['DELETE'])
def delete_movie(movie_id):
    try:
        # token to authorize will located in the request header as 'Authorization'
        # an admin object will be created with the id of the admin
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # if the admin is found in the database, the movie will be deleted
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            movie = Movie()
            movie.movieId = movie_id
            result = admin.delete_movie(movie)
            if result is not False:
                return "", 200
            return "Movie not found", 404
        return "Delete movie failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500


# add a movie in the database (admin only)
@admin_bp.route("/movies/", methods=['POST'])
def add_movie():
    try:
        # token to authorize will located in the request header as 'Authorization'
        # an admin object will be created with the id of the admin
        accessToken = request.headers.get('Authorization')[4:]
        adminId = Account.get_id(accessToken)
        # if the admin is found in the database, the movie will be added
        if (adminId != False):
            admin = Admin()
            admin.id = adminId
            movie_data = request.get_json()
            movie = Movie()
            movie.movieTitle = movie_data['movieTitle']
            movie.moviePoster = movie_data['moviePoster']
            movie.movieGenre = movie_data['movieGenre']
            result = admin.new_movie(movie)
            if result is not False:
                return movie.get_info(), 200
        return "Add movie failed due to bad credentials", 403
    except:
        return "Unexpected Error", 500
