// author: @iamtienng
// this component is used to display the list of movies
// as a table in admin UI
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminMoviesList = (props) => {
  let navigate = useNavigate();
  const navigateToMoviePage = (movie) => {
    let path = `/admin/movies/${movie.movieId}`;
    navigate(path);
  };
  return (
    <>
      <table className="table table-dark table-striped table-hover ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Genres</th>
          </tr>
        </thead>
        <tbody>
          {props.movies.map((movie, index) => (
            <tr
              key={index}
              onClick={() => {
                navigateToMoviePage(movie);
              }}
              cursor="pointer"
            >
              <td>{movie.movieId}</td>
              <td>{movie.movieTitle}</td>
              <td>{movie.movieGenre.replaceAll("|", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminMoviesList;
