# author: @iamtienng
# import flask dependencies
from flask import Blueprint, jsonify, request

# import database and machine learning model
from extensions import db, mfcf_model

# define the blueprint: 'recommender', set its url prefix: app.url/recommender
recommender_bp = Blueprint('recommender_bp', __name__)


# get a prediction for user about a movie
@recommender_bp.route("/predict/one/", methods=['POST'])  # type: ignore
def recommender_predict():
    try:
        # get the request's data as json
        data = request.get_json()
        # get the user id and movie id from the request's data
        userId = data['userId']
        movieId = data['movieId']
        # get the prediction from the model
        pred = mfcf_model.pred(userId, movieId)
        return pred, 200
    except:
        return None, 500

# get a prediction for user about a movie


@recommender_bp.route("/predict/topten/", methods=['POST'])
def recommender_predict_top_ten():
    # get the request's data as json
    data = request.get_json(force=True)
    # get the user id from the request's data
    userId = int(data['userId'])
    # get the prediction from the model
    result = mfcf_model.predTopTen(userId)
    # get the movies data from the database
    movieCursor = db["movie"].find(
        {"movieId": {"$in": result[0]}}, {'_id': False})
    response = {"movies_data": [], "movies_order": []}
    movies_data = []
    for movie in movieCursor:
        movies_data.append(movie)
    # return the result as a list of json
    # result will contain movie data and order by the prediction value
    response["movies_data"] = (movies_data)
    movies_order = result[0]
    response["movies_order"] = (movies_order)
    return jsonify(response), 200
