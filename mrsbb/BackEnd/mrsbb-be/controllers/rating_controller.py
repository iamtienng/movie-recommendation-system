# author: @iamtienng
# import flask dependencies
from flask import Blueprint, jsonify, request

# import models
from models.rating import Rating
from models.movie import Movie
from models.user import User

# define the blueprint: 'rating', set its url prefix: app.url/rating
rating_bp = Blueprint('rating_bp', __name__)


# create a new rating for a movie by a user
@rating_bp.route("/create/", methods=['POST'])
def create_rating():
    try:
        # get data from request body
        # data will be in json format
        # data will contain the movieId, userId and rating score
        data = request.get_json(force=True)
        # create a movie object with the movieId
        movie = Movie()
        movie.movieId = int(data['movieId'])
        # create a user object with the userId
        user = User()
        user.id = int(data['userId'])
        # call the create_rating function of the user object
        ratingInfo = user.create_rating(movie, data['rating'])
        if (ratingInfo != False):
            return jsonify(ratingInfo), 200
        return {'status': 'failed'}, 400
    except:
        return "Unexpected error.", 500


@rating_bp.route("/read/", methods=['POST'])  # read a rating information
def read_rating():
    try:
        # get data from request body
        data = request.get_json(force=True)
        # create a rating object with the userId and movieId
        rating = Rating(int(data['userId']), int(data['movieId']))
        # call the get_info_from_db function of the rating object
        if (rating.get_info_from_db()):
            return jsonify(rating.get_info()), 200
        return {'status': 'failed'}, 400
    except:
        return "Unexpected error.", 500

# update a rating information


@ rating_bp.route("/update/", methods=['PUT'])
def update_rating():
    try:
        # get data from request body
        data = request.get_json(force=True)
        # create a movie object with the movieId
        movie = Movie()
        movie.movieId = int(data['movieId'])
        # create a user object with the userId
        user = User()
        user.id = int(data['userId'])
        # call the update_rating function of the user object
        ratingInfo = user.update_rating(movie, data['rating'])
        if (ratingInfo != False):
            return jsonify(ratingInfo), 200
        return {'status': 'Not rated'}, 404
    except:
        return "Unexpected error.", 500

# delete a rating information


@ rating_bp.route("/delete/", methods=['DELETE'])
def delete_rating():
    try:
        # get data from request body
        data = request.get_json(force=True)
        # create a movie object with the movieId
        movie = Movie()
        movie.movieId = int(data['movieId'])
        # create a user object with the userId
        user = User()
        user.id = int(data['userId'])
        # call the delete_rating function of the user object
        ratingInfo = user.delete_rating(movie)
        if (ratingInfo != False):
            return {'status': 'deleted'}, 200
        return {'status': 'failed'}, 400
    except:
        return "Unexpected error.", 500
