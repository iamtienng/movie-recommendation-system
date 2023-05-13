# author: @iamtienng
# import database and machine learning model
from extensions import db, mfcf_model

# import tools
from datetime import datetime
import numpy as np


class Rating:
    userId = 0
    movieId = 0
    rating = 0
    timestamp = 0

    # a rating should always be created with a user id and a movie id
    def __init__(self, userId, movieId):
        self.userId = userId
        self.movieId = movieId

    # insert a new rating into the database
    def create(self, rating):
        # check if the rating already exists
        if self.get_info_from_db():
            return False
        # if the rating does not exist
        self.rating = rating
        self.timestamp = datetime.now().timestamp().__int__()
        # insert the rating value into the machine learning model
        mfcf_model.Y = np.append(mfcf_model.Y, np.asarray(
            [self.userId, self.movieId, self.rating, self.timestamp]).reshape(1, 4), axis=0)
        # update the user vector and user bias in the machine learning model
        mfcf_model.updateWdUserU(self.userId)
        # insert the rating into the database
        db["rating"].insert_one(self.get_info())
        return True

    # update the rating value in the database
    def update(self, newRating):
        # check if the rating exists
        if self.get_info_from_db():
            # update the rating value in the machine learning model
            ids = np.where(mfcf_model.Y[:, 0] == self.userId)[0]
            # find the rating in the machine learning model
            for i in ids:
                if mfcf_model.Y[i][0, 1] == self.movieId:
                    mfcf_model.Y[i][0, 2] = newRating
            # update the user vector and user bias in the machine learning model
            mfcf_model.updateWdUserU(self.userId)
            # update the rating value in the database
            db["rating"].update_one({"userId": self.userId, "movieId": self.movieId}, {
                "$set": {"rating": newRating}})
            return True
        return False

    # delete the rating from the database
    def delete(self):
        # check if the rating exists
        if self.get_info_from_db():
            # delete the rating from the machine learning model
            ids = np.where(mfcf_model.Y[:, 0] == self.userId)[0]
            # find the rating in the machine learning model
            for i in ids:
                if mfcf_model.Y[i][0, 1] == self.movieId:
                    mfcf_model.Y = np.delete(mfcf_model.Y, i, axis=0)
            # update the user vector and user bias in the machine learning model
            mfcf_model.updateWdUserU(self.userId)
            # delete the rating from the database
            db["rating"].delete_one(
                {"userId": self.userId, "movieId": self.movieId})
            return True
        return False

    # get the rating information
    def get_info(self):
        return {
            "userId": self.userId,
            "movieId": self.movieId,
            "rating": self.rating,
            "timestamp": self.timestamp,
        }

    # get the rating information from the database
    def get_info_from_db(self):
        ratingCursor = db["rating"].find(
            {"userId": self.userId, "movieId": self.movieId})
        if (ratingCursor.count() > 0):
            self.userId = ratingCursor[0]['userId']
            self.movieId = ratingCursor[0]['movieId']
            self.rating = ratingCursor[0]['rating']
            self.timestamp = ratingCursor[0]['timestamp']
            return True
        return False
