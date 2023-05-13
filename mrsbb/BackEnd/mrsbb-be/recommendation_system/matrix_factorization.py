# author: @iamtienng
# import numpy for matrix operations
import numpy as np


class MatrixFactorization(object):
    # constructor for the model
    def __init__(self, Y, K, lam=0.1, Xinit=None, Winit=None, bInit=None, dInit=None,
                 learning_rate=0.5, max_iter=10000):
        self.Y = Y  # represents the utility matrix
        self.K = K  # number of features
        self.lam = lam  # regularization parameter lambda
        self.learning_rate = learning_rate  # for gradient descent update velocity
        self.max_iter = max_iter  # maximum number of iterations
        self.n_users = int(np.max(Y[:, 0])) + \
            1 if dInit is None else len(dInit)  # number of users
        self.users_ids = np.unique(np.asarray(
            Y[:, 0].reshape(Y[:, 0].shape[0]))).astype(np.int32)  # user ids
        self.n_items = int(np.max(Y[:, 1])) + \
            1 if bInit is None else len(bInit)  # number of items
        self.items_ids = np.unique(np.asarray(
            Y[:, 1].reshape(Y[:, 1].shape[0]))).astype(np.int32)  # item ids
        self.n_ratings = Y.shape[0]  # number of ratings
        self.X = np.random.randn(
            self.n_items, K) if Xinit is None else Xinit  # item features
        self.W = np.random.randn(
            K, self.n_users) if Winit is None else Winit  # user features
        self.b = np.random.randn(
            self.n_items) if bInit is None else bInit  # item bias
        self.d = np.random.randn(
            self.n_users) if dInit is None else dInit  # user bias

    # when a new user registers, add a new row to W and d
    # and add the user id to the users_ids array
    # and update the number of users
    def add_user(self, user_id):
        self.n_users += 1
        self.users_ids = np.append(self.users_ids, user_id)
        self.W = np.append(self.W, np.zeros((self.W.shape[0], 1)), axis=1)
        self.d = np.append(self.d, 0)

    # when a new movie is added, add a new row to X and b
    # and add the movie id to the items_ids array
    # and update the number of items
    def add_movie(self, movie_id):
        self.n_items += 1
        self.items_ids = np.append(self.items_ids, movie_id)
        self.X = np.append(self.X, np.zeros((1, self.X.shape[1])), axis=0)
        self.b = np.append(self.b, 0)

    # update model X and b for model when in training mode
    def updateXb(self):
        for m in self.items_ids:
            # get all users who rated item m, and the corresponding ratings
            ids = np.where(self.Y[:, 1] == m)[0]  # row indices of items m
            user_ids, ratings = self.Y[ids, 0].astype(np.int32), self.Y[ids, 2]
            # get the corresponding rows of W and d
            Wm, dm = self.W[:, user_ids], self.d[user_ids]
            # reshape Wm to be K x n_users
            Wm = Wm.reshape(Wm.shape[0], Wm.shape[1])
            for i in range(30):  # 30 iteration for each sub problem
                # calculate the gradient as the formula in the paper
                xm = self.X[m]
                error = Wm.T.dot(xm).reshape(-1, 1) + self.b[m] + dm - ratings
                grad_xm = Wm.dot(error)/self.n_ratings + \
                    (self.lam*xm).reshape(-1, 1)
                grad_bm = np.sum(error)/self.n_ratings
                # gradient descent
                self.X[m] -= np.array((self.learning_rate*grad_xm).T)[0]
                self.b[m] -= self.learning_rate*grad_bm

    # update model W and d for model when in training mode
    def updateWd(self):
        for n in self.users_ids:
            # get all items rated by user n, and the corresponding ratings
            ids = np.where(self.Y[:, 0] == n)[0]  # row indices of users n
            item_ids, ratings = self.Y[ids, 1].astype(np.int32), self.Y[ids, 2]
            # get the corresponding rows of X and b
            Xn, bn = self.X[item_ids], self.b[item_ids]
            for i in range(30):  # 30 iteration for each sub problem
                # calculate the gradient as the formula in the paper
                wn = self.W[:, n]
                error = Xn.dot(wn) + bn + self.d[n] - ratings
                grad_wn = Xn.T.dot(error)/self.n_ratings + self.lam*wn
                grad_dn = np.sum(error)/self.n_ratings
                # gradient descent
                self.W[:, n] -= np.array(self.learning_rate *
                                         grad_wn.reshape(-1))[0]
                self.d[n] -= self.learning_rate*grad_dn

    # update model X and b for model when
    # a specific movie needs to be updated
    def updateXbItemI(self, itemID):
        m = itemID
        ids = np.where(self.Y[:, 1] == m)[0]  # row indices of items m
        if len(ids) == 0:
            return False
        user_ids, ratings = self.Y[ids, 0].astype(np.int32), self.Y[ids, 2]
        Wm, dm = self.W[:, user_ids], self.d[user_ids]
        Wm = Wm.reshape(Wm.shape[0], Wm.shape[1])
        for i in range(30):  # 30 iteration for each sub problem
            xm = self.X[m]
            error = Wm.T.dot(xm).reshape(-1, 1) + self.b[m] + dm - ratings
            grad_xm = Wm.dot(error)/self.n_ratings + \
                (self.lam*xm).reshape(-1, 1)
            grad_bm = np.sum(error)/self.n_ratings
            # gradient descent
            self.X[m] -= np.array((self.learning_rate*grad_xm).T)[0]
            self.b[m] -= self.learning_rate*grad_bm
        return True

    # update model W and d for model when
    # a specific user needs to be updated
    def updateWdUserU(self, userID):
        n = userID
        ids = np.where(self.Y[:, 0] == n)[0]
        if len(ids) == 0:
            return False
        item_ids, ratings = self.Y[ids, 1].astype(np.int32), self.Y[ids, 2]
        Xn, bn = self.X[item_ids], self.b[item_ids]
        for i in range(30):  # 30 iteration for each sub problem
            wn = self.W[:, n]
            error = Xn.dot(wn) + bn + self.d[n] - ratings
            grad_wn = Xn.T.dot(error)/self.n_ratings + self.lam*wn
            grad_dn = np.sum(error)/self.n_ratings
            # gradient descent
            self.W[:, n] -= np.array(float(self.learning_rate)
                                     * grad_wn.reshape(-1))[0].astype(float)
            self.d[n] -= self.learning_rate*grad_dn
        return True

    # return current loss value
    def loss(self):
        L = 0
        for i in range(self.n_ratings):
            # user_id, item_id, rating
            n, m, rating = int(self.Y[i, 0]), int(self.Y[i, 1]), self.Y[i, 2]
            L += 0.5*(self.X[m].dot(self.W[:, n]) +
                      self.b[m] + self.d[n] - rating)**2
        L /= self.n_ratings
        # regularization, don't ever forget this
        return L + 0.5*self.lam*(np.sum(self.X**2) + np.sum(self.W**2))

    # train function for model
    def fit(self):
        # determine the number of iterations
        for it in range(self.max_iter):
            # update X and b
            self.updateXb()
            # update W and d
            self.updateWd()
            # print loss value for each iteration
            print("iteration: ", it, " loss: ", self.loss())

    def pred(self, u, i):
        # predict the rating of user u for item i
        try:
            # calculate the prediction value as the formula in the paper
            pred = self.X[i, :].dot(self.W[:, u]) + self.b[i] + self.d[u]
        except:
            return 0
        return max(0, min(5, pred))

    # predict the top 10 items for user user_id
    def predTopTen(self, u):
        # determine the user_id
        user_id = u
        # get all items ids
        items_ids = np.unique(np.asarray(self.Y[:, 1].reshape(
            self.Y[:, 1].shape[0]))).astype(np.int32)
        # get all items rated by user user_id
        ids = np.where(self.Y[:, 0] == user_id)[0]
        # get unrated items
        rated_item_ids = self.Y[ids, 1].astype(np.int32)
        unrated_item_ids = [x for x in items_ids if x not in rated_item_ids]
        items_ids = unrated_item_ids
        # predict the rating for each unrated item
        predForUserU = np.random.randn(len(items_ids), 2)
        for i in range(len(items_ids)):
            predForUserU[i] = [items_ids[i], self.pred(u=user_id, i=i)]
        # sort the predictions and return the top 10 items
        predForUserU = predForUserU[predForUserU[:, 1].argsort()][::-1]
        idsTopTen = predForUserU[:10, 0].astype(np.int32).tolist()
        # also return the top 10 ratings
        ratingsTopTen = predForUserU[:10, 1].tolist()
        return (idsTopTen, ratingsTopTen)

    # evaluate the model using RMSE
    def evaluate_RMSE(self, rate_test):
        # determind the number of ratings in the test set
        n_tests = rate_test.shape[0]
        SE = 0
        for n in range(n_tests):
            # calculate the prediction value
            pred = self.pred(rate_test[n, 0], rate_test[n, 1])
            # calculate the different between the prediction and the real value
            SE += (pred - rate_test[n, 2])**2

        RMSE = np.sqrt(SE/n_tests)
        return RMSE
