# author: @iamtienng
# import database
from extensions import db


class Movie:
    movieId = -1
    movieTitle = ""
    movieGenre = ""
    moviePoster = ""

    # get the information of the movie
    def get_info(self):
        return {
            "movieId": self.movieId,
            "movieTitle": self.movieTitle,
            "movieGenre": self.movieGenre,
            "moviePoster": self.moviePoster,
        }

    # get the information of the movie from the database
    def get_info_from_db(self):
        movieCursor = db["movie"].find(
            {"movieId": self.movieId}, {"_id": False})
        if (movieCursor.count() > 0):
            self.movieId = movieCursor[0]['movieId']
            self.movieTitle = movieCursor[0]['movieTitle']
            self.movieGenre = movieCursor[0]['movieGenre']
            self.moviePoster = movieCursor[0]['moviePoster']
            return True
        return False
