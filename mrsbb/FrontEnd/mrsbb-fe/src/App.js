// author: @iamtienng
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./hocs/Layout";
import { Provider } from "react-redux";
import Store from "./Store";

import PageNotFound from "./containers/Others/PageNotFound";

import Login from "./containers/Authentication/Login";
import Signup from "./containers/Authentication/Signup";

import SearchMovies from "./containers/Movies/SearchMovies";
import Home from "./containers/Others/Home";
import SuggestMovies from "./containers/Movies/SuggestMovies";
import MoviePage from "./containers/Movies/MoviePage";

import AdminLogin from "./containers/Admin/AdminLogin";
import AdminUsersManagement from "./containers/Admin/AdminUsersManagement";
import AdminMoviesManagement from "./containers/Admin/AdminMoviesManagement";
import AdminHome from "./containers/Admin/AdminHome";
import AdminUserPage from "./containers/Admin/AdminUserPage";
import AdminMoviePage from "./containers/Admin/AdminMoviePage";
import AdminAddMovie from "./containers/Admin/AdminAddMovie";

const App = () => (
  <Provider store={Store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/search" element={<SearchMovies />} />
          <Route exact path="/suggest" element={<SuggestMovies />} />
          <Route exact path="/movie/:id" element={<MoviePage />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
          <Route exact path="/admin/users" element={<AdminUsersManagement />} />
          <Route exact path="/admin/users/:id" element={<AdminUserPage />} />
          <Route
            exact
            path="/admin/movies"
            element={<AdminMoviesManagement />}
          />
          <Route exact path="/admin/movies/:id" element={<AdminMoviePage />} />
          <Route exact path="/admin/movies/add" element={<AdminAddMovie />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
