// author: @iamtienng
// this component is used to display the list of movies
// the data are a json list
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieList = (props) => {
  let navigate = useNavigate();
  const navigateToMoviePage = (movie) => {
    let path = `/movie/${movie.movieId}`;
    navigate(path);
  };
  return (
    <>
      {props.movies.map((movie) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          onClick={() => {
            navigateToMoviePage(movie);
          }}
          key={movie.movieId}
        >
          <img
            src={movie.moviePoster}
            style={{ width: "300px", height: "500px" }}
            alt="movie"
          ></img>
          <div className="overlay d-flex align-items-center justify-content-center">
            {movie.movieTitle}
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
