# author: @iamtienng
# import tools for saving model in database
import pickle

# import tools for machine learning model
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# import machine learning model
from recommendation_system.matrix_factorization import MatrixFactorization

# import tools for database
from pymongo import MongoClient
import bson

# connect to the database
# usernameDB = "iamtienng"
# passwordDB = "d4O8CmCGCeCI8vzA"
client = MongoClient(
    'mongodb+srv://iamtienng:d4O8CmCGCeCI8vzA@mrsbbdb.wqcrinp.mongodb.net/?retryWrites=true&w=majority')
# localhost
# client = MongoClient("localhost", 27017)
db = client["MRSBBDB"]
# YOU MUST import ratings through MongoDBCompass
# YOU MUST import movies through MongoDBCompass

# load models for mfcf model if the model does not exist in the database
W = np.asarray([])
X = np.asarray([])
d = np.asarray([])
b = np.asarray([])
if len(list(db["model"].find())) == 0:
    W = np.loadtxt('./data/W.csv', delimiter=',')
    X = np.loadtxt('./data/X.csv', delimiter=',')
    d = np.loadtxt('./data/d.csv', delimiter=',')
    b = np.loadtxt('./data/b.csv', delimiter=',')

    wf = {"name": "W", "value": bson.Binary(pickle.dumps(W, protocol=2))}
    xf = {"name": "X", "value": bson.Binary(pickle.dumps(X, protocol=2))}
    df = {"name": "d", "value": d.tolist()}
    bf = {"name": "b", "value": b.tolist()}

    db["model"].insert_one(wf)
    db["model"].insert_one(xf)
    db["model"].insert_one(df)
    db["model"].insert_one(bf)
else:
    for model in db["model"].find():
        if model['name'] == "W":
            W = np.asarray(pickle.loads(model['value']))
        elif model['name'] == "X":
            X = np.asarray(pickle.loads(model['value']))
        elif model['name'] == "d":
            d = np.asarray(model['value'])
        elif model['name'] == "b":
            b = np.asarray(model['value'])

# load all ratings as utility matrix for mfcf model
ratings_cursor = db['rating'].find()
ratings_dataframe = pd.DataFrame(list(ratings_cursor), columns=[
    'userId', 'movieId', 'rating', 'timestamp']).astype({'userId': int, 'movieId': int, 'rating': int, })
ratings_matrix = np.asmatrix(ratings_dataframe)
rate_train, rate_test = train_test_split(
    ratings_matrix, test_size=0.2, random_state=10)

# mfcf machine learning model
mfcf_model = MatrixFactorization(
    Y=ratings_matrix, K=50, lam=.01, Xinit=X, Winit=W, bInit=b, dInit=d, learning_rate=50, max_iter=30)
