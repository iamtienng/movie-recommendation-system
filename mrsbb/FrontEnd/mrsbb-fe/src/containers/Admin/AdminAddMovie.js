/* eslint-disable jsx-a11y/anchor-is-valid */
// author: @iamtienng
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./CSS/AdminHome.CSS";

const AdminAddMovie = ({ isAuthenticated, adminAuthenticated }) => {
  const [formData, setFormData] = useState({
    movieTitle: "",
    movieGenre: "",
    moviePoster: "",
  });
  const { movieTitle, movieGenre, moviePoster } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    add_movie_request();
  };

  const add_movie_request = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/movies/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieTitle: movieTitle,
        movieGenre: movieGenre,
        moviePoster: moviePoster,
      }),
    });
    const responseData = await response.json();

    if (response.status === 200) {
      alert("Movie added successfully with id: " + responseData.movieId);
    } else {
      alert("Movie not added");
    }
  };

  if (isAuthenticated === false || adminAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="container px-4 py-5" id="featured-3">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="movieTitle">Movie Title</label>
          <input
            className="form-control form-control-lg"
            id="movieTitle"
            placeholder="Enter Movie Title"
            name="movieTitle"
            value={movieTitle}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieGenre">Movie Genre</label>
          <input
            className="form-control form-control-lg"
            id="movieGenre"
            placeholder="Enter Movie Title"
            name="movieGenre"
            value={movieGenre}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="moviePoster">Movie Poster URL</label>
          <input
            type="url"
            className="form-control form-control-lg"
            id="moviePoster"
            placeholder="Enter Movie Title"
            name="moviePoster"
            value={moviePoster}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <hr />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps)(AdminAddMovie);
