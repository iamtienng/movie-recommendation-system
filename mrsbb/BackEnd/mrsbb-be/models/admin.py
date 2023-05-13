# author: @iamtienng
# import database ahd machine learning model
from extensions import db, mfcf_model

# import models
from models.people import People
from models.user import User
from models.movie import Movie
from models.jwt import JWT

# import tools
from datetime import datetime


class Admin(People):
    # constructor
    def __init__(self):
        self.type = "admin"

    # verify the authorization of the admin
    def verify_auth(token):
        # create a JWT object with the token
        jwt = JWT("access")
        jwt.token = token
        # get the information from the database
        if (jwt.get_info_from_db()):
            # if the token is not expired
            if jwt.user_id < 6000 and datetime.now().timestamp().__int__() < jwt.expires_at:
                return True
        return False

    # get all users
    def get_all_users(self):
        # get all users from the database
        usersCursor = db["user"].find({}, {"_id": False})
        usersList = list(usersCursor)
        # if there are users
        if (usersCursor.count() > 0):
            return usersList
        return []

    # get a user with a user object
    def get_user(self, user: User):
        # get the user from the database
        if (user.get_info_from_db()):
            # if the user exists, return the user information
            return user.get_info()
        return {}

    # delete a user with a user object
    def delete_user(self, user: User):
        # get the user from the database
        if (user.get_info_from_db()):
            # if the user exists, delete the user
            db["user"].update_one(
                {"id": user.id}, {"$set": {"email": user.email + "_deleted"}})
            return True
        return False

    def get_all_movies(self):
        # get all movies from the database
        moviesCursor = db["movie"].find({}, {"_id": False})
        moviesList = list(moviesCursor)
        # if there are movies
        if (moviesCursor.count() > 0):
            # return the list of movies
            return moviesList
        return []

    # get a movie with a movie object
    def get_movie(self, movie: Movie):
        # get the movie from the database
        if (movie.get_info_from_db()):
            # if the movie exists, return the movie information
            return movie
        return {}

    # delete a movie with a movie object
    def delete_movie(self, movie: Movie):
        # get the movie from the database
        if (movie.get_info_from_db()):
            # if the movie exists, delete the movie
            db["movie"].update_one(
                {"movieId": movie.movieId}, {"$set": {"movieTitle": movie.movieTitle + "_deleted"}})
            return True
        return False

    # add a new movie
    def new_movie(self, movie: Movie):
        # get the latest movieId
        latest_movie = db["movie"].find_one(sort=[("movieId", -1)])
        if latest_movie is None:
            movie.movieId = 0
        else:
            # add 1 to the latest movieId
            movie.movieId = latest_movie['movieId'] + 1
        # insert the new movie into the database
        db["movie"].insert_one({
            "movieId": movie.movieId,
            "movieTitle": movie.movieTitle,
            "movieGenre": movie.movieGenre,
            "moviePoster": movie.moviePoster,
        })
        # update the model with the new movie
        mfcf_model.add_movie(movie.movieId)
        mfcf_model.updateXbItemI(movie.movieId)
        return True
