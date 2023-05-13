// author: @iamtienng
// this container is used to display a page that
// suggests movies for the user
// movies will be a list of ten movies
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./CSS/SuggestMovies.css";

import MovieList from "../../components/MovieList";
import Heading from "../../components/Heading";

const SuggestMovies = ({ isAuthenticated }) => {
  const [userId, setUserId] = useState(-1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovieRequest = async (userId) => {
      if (userId === -1) return;
      if (typeof userId == "undefined") return;

      // call the api to get the list of suggested movies
      const url = `${process.env.REACT_APP_API_URL}/recommender/predict/topten/`;
      const response = await fetch(url, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        // body will contain userId
        body: JSON.stringify({ userId: userId }),
      });
      const responseJson = await response.json();

      if (responseJson) {
        let movies_data_ordered = [];
        for (let i in responseJson.movies_order) {
          movies_data_ordered.push(
            responseJson.movies_data.find(
              (movie) => movie.movieId === responseJson.movies_order[i]
            )
          );
        }
        setMovies(movies_data_ordered);
      }
    };
    setUserId(localStorage.getItem("userId"));
    getMovieRequest(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="container-fluid movie-app">
      <div className="d-flex justify-content-between mt-4 mb-4 ">
        <Heading heading="Top 10 Recommended Movies For You" />
      </div>
      <div className="row row-cols-auto">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(SuggestMovies);
