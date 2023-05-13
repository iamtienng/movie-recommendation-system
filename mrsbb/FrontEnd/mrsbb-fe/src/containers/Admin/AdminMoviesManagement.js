// author: @iamtienng
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
// import "./CSS/Login.css";
import { admin_load_movies_list } from "../../actions/Admin";
import AdminMoviesList from "../../components/AdminMoviesList";
import Heading from "../../components/Heading";

const MoviesManagement = ({
  admin_load_movies_list,
  isAuthenticated,
  adminAuthenticated,
}) => {
  const [movies, setmovies] = useState([]);

  let navigate = useNavigate();
  const navigateToAddMoviePage = () => {
    let path = `/admin/movies/add`;
    navigate(path);
  };

  useEffect(() => {
    admin_load_movies_list().then(function (result) {
      if (result !== false) {
        setmovies(result);
      }
    });
  }, [admin_load_movies_list]);

  if (isAuthenticated === false || adminAuthenticated === false) {
    return <Navigate replace to="/admin/login" />;
  }

  return (
    <div>
      <div>
        <div>
          <Heading heading="Movies Management" />
          <p>Click to a row to turn into specific movie page.</p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={navigateToAddMoviePage}
          >
            Add new Movie
          </button>
          <hr />
        </div>
      </div>
      <AdminMoviesList movies={movies} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps, { admin_load_movies_list })(
  MoviesManagement
);
