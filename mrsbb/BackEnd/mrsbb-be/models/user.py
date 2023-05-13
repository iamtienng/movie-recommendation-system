# author: @iamtienng
# import models
from models.people import People
from models.rating import Rating
from models.movie import Movie


class User(People):
    def __init__(self):
        self.type = "user"

    def create_rating(self, movie: Movie, ratingValue):
        newRating = Rating(self.id, movie.movieId)
        if (newRating.create(ratingValue)):
            return newRating.get_info()
        return False

    def update_rating(self, movie: Movie, newRatingValue):
        rating = Rating(self.id, movie.movieId)
        if (rating.update(newRatingValue)):
            return rating.get_info()
        return False

    def delete_rating(self, movie: Movie):
        rating = Rating(self.id, movie.movieId)
        if (rating.delete()):
            return True
        return False
