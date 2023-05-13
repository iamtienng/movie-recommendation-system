// author: @iamtienng
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./CSS/SearchMovies.css";

import MovieList from "../../components/MovieList";
import Heading from "../../components/Heading";
import SearchBox from "../../components/SearchBox";

const SearchMovies = ({ isAuthenticated }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // search text will be updated when user types in the search box
  useEffect(() => {
    const getMovieRequest = async () => {
      if (search.length < 3) return;
      const url = `${process.env.REACT_APP_API_URL}/movie/s?query=${search}`;
      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson) {
        setMovies(responseJson);
      }
    };
    getMovieRequest();
    // each time search text is updated, the useEffect will be called
  }, [search]);

  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="container-fluid movie-app">
      <div className="d-flex justify-content-between mt-4 mb-4 ">
        <Heading heading="Type to Search" />
      </div>
      <div className="d-flex justify-content-between mt-4 mb-4 ">
        <SearchBox search={search} setSearch={setSearch} />
      </div>
      <div className="row row-cols-auto">
        <MovieList movies={movies} className="movie-list" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(SearchMovies);
