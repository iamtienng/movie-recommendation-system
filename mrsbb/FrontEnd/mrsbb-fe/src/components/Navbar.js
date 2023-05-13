// author: @iamtienng
// Navigation bar component based on Bootstrap
// this component is used to display the navigation bar
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/Auth";

const Navbar = ({ logout, isAuthenticated, adminAuthenticated }) => {
  // depending on the user's authentication status, the navigation bar will display different links
  // if the user is not authenticated, the navigation bar will display the login and signup links
  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
    </Fragment>
  );

  // if the user is authenticated, the navigation bar will display the home, search and logout links
  const authLinks = () => (
    <li className="nav-item">
      <Link className="nav-link active" aria-current="page" to="/">
        Home
      </Link>
      <Link className="nav-link active" aria-current="page" to="/suggest">
        Your Top 10 Recommended Movies
      </Link>
      <Link className="nav-link active" aria-current="page" to="/search">
        Search
      </Link>
      <Link className="nav-link" to="#!" onClick={logout}>
        Logout
      </Link>
    </li>
  );

  // if the user is authenticated as an admin, the navigation bar will display the home, users management, movies management and logout links
  const adminLinks = () => (
    <li className="nav-item">
      <Link className="nav-link active" aria-current="page" to="/admin">
        Home
      </Link>
      <Link className="nav-link active" aria-current="page" to="/admin/users">
        Users Management
      </Link>
      <Link className="nav-link active" aria-current="page" to="/admin/movies">
        Movies Management
      </Link>
      <Link className="nav-link" to="#!" onClick={logout}>
        Logout
      </Link>
    </li>
  );

  // this function is used to determine which links will be displayed on the navigation bar
  const nabBarType = () => {
    if (isAuthenticated === false && adminAuthenticated === false) {
      return guestLinks();
    } else if (isAuthenticated === true && adminAuthenticated === false) {
      return authLinks();
    } else if (isAuthenticated === true && adminAuthenticated === true) {
      return adminLinks();
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Movie Recommendation System By Bot
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{nabBarType()}</ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
