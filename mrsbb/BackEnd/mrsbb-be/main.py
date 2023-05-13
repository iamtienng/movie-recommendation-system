# author: @iamtienng
# import flask and flask_cors
from flask import Flask
from flask_cors import CORS

# import blueprint from controllers
from controllers.auth_controller import auth_bp
from controllers.movie_controller import movie_bp
from controllers.rating_controller import rating_bp
from controllers.recommender_controller import recommender_bp
from controllers.admin_controller import admin_bp

# import database and machine learning model
from extensions import db, mfcf_model, rate_test

# import tools
import pickle
import bson
import atexit
import os

app = Flask(__name__)
CORS(app)
app.config.from_object('config')
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(movie_bp, url_prefix='/movie')
app.register_blueprint(rating_bp, url_prefix='/rating')
app.register_blueprint(recommender_bp, url_prefix='/recommender')
app.register_blueprint(admin_bp, url_prefix='/admin')


def on_close_server():
    print("Closing server")
    wf = {"name": "W", "value": bson.Binary(
        pickle.dumps(mfcf_model.W, protocol=2))}
    xf = {"name": "X", "value": bson.Binary(
        pickle.dumps(mfcf_model.X, protocol=2))}
    df = {"name": "d", "value": mfcf_model.d.tolist()}
    bf = {"name": "b", "value": mfcf_model.b.tolist()}
    db["model"].delete_many({})
    db["model"].insert_one(wf)
    db["model"].insert_one(xf)
    db["model"].insert_one(df)
    db["model"].insert_one(bf)
    print("Model saved")


atexit.register(on_close_server)


if __name__ == "__main__":
    print("RSME of Model: "+str(mfcf_model.evaluate_RMSE(rate_test)))
    print("Number of ratings: "+str(mfcf_model.n_ratings))
    print("Number of users: "+str(mfcf_model.n_users))

    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
