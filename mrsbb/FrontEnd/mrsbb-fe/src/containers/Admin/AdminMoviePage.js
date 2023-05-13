// author: @iamtienng
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
// import "./CSS/MoviePage.css";

import Heading from "../../components/Heading";

const AdminMoviePage = ({ isAuthenticated }) => {
  const [movie, setMovie] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const movieId = parseInt(useParams().id);

  const deleted_button = () => (
    <button className="btn btn-secondary" disabled>
      Deleted
    </button>
  );
  const delete_button = () => (
    <button
      className="btn btn-danger"
      type="submit"
      onClick={delete_movie_request}
    >
      Delete
    </button>
  );
  const check_movie_deleted = (title) => {
    if (title.slice(-8) === "_deleted") {
      return true;
    }
    return false;
  };
  const delete_movie_request = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/movies/${movieId}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem("access")}`,
      },
    });
    await response.response;

    if (response.status === 200) {
      alert("Movie deleted successfully");
      setIsDeleted(true);
    }
  };

  useEffect(() => {
    const getMovieRequest = async () => {
      const url = `${process.env.REACT_APP_API_URL}/admin/movies/${movieId}/`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          'Authorization': `JWT ${localStorage.getItem("access")}`,
          // prettier-ignore
          'Accept': 'application/json',
        },
      });
      const responseJson = await response.json();

      if (responseJson) {
        setMovie(responseJson);
        setIsDeleted(check_movie_deleted(responseJson.movieTitle));
      }
    };
    getMovieRequest();
  }, [movieId, isDeleted]);

  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="container-fluid movie-app">
      <div className="d-flex justify-content-between mt-4 mb-4 ">
        <Heading heading={"Movie ID: " + movie.movieId} />
      </div>
      <div className="row row-cols-auto">
        <div className="d-flex justify-content-start m-3">
          <div className="image-container">
            <img
              src={movie.moviePoster}
              style={{ width: "300px", height: "500px" }}
              alt="movie"
            ></img>
            <div className="overlay d-flex align-items-center justify-content-center">
              {movie.movieTitle}
            </div>
          </div>
          <div className="m-4 col">
            <h3> - - </h3>
            <h2>Movie Title:</h2>
            <h3>{movie.movieTitle}</h3>
            <h3> - - </h3>
            <h2>Movie Genres:</h2>
            <h3>{movie.movieGenre}</h3>
            <h3> - - </h3>
            <h3>{isDeleted ? deleted_button() : delete_button()}</h3>
            <h3> - - </h3>
          </div>
        </div>
        <div className="title"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AdminMoviePage);
