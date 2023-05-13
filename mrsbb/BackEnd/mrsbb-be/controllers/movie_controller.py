# author: @iamtienng
# import flask dependencies
from flask import Blueprint, request, jsonify

# import models
from models.movie import Movie

# import database for movies searching
from extensions import db

# import tools
from tools.regex_tools import escapeRegExp

# define the blueprint: 'movie', set its url prefix: app.url/movie
movie_bp = Blueprint('movie_bp', __name__)


# search movie by title
@movie_bp.route("/s", methods=['GET'])
def search_movie():
    try:
        # get query from request
        query = escapeRegExp(request.args.get('query'))
        # if the query is too short, return error
        if len(query) < 3:
            return "Query length is too short.", 400
        else:
            # search for movies in the database
            movieCursor = db['movie'].find({"movieTitle": {'$regex': query, '$options': 'i'}}, {
                '_id': False})
            # if there are movies found, return them
            if (movieCursor.count() > 0):
                return list(movieCursor), 200
            return "No movie found.", 404
    except:
        return "Unexpected Error", 500


# get movie detail by id
@ movie_bp.route("/d", methods=['GET'])
def get_movie_detail():
    try:
        # create a movie object with the id from the request
        movie = Movie()
        movie.movieId = int(request.args.get('query'))
        # if the movie is found in the database, return the information
        if (movie.get_info_from_db()):
            return jsonify(movie.get_info()), 200
        return "No movie found.", 404
    except:
        return "Unexpected Error", 500
