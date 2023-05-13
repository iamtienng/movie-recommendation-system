/* eslint-disable jsx-a11y/anchor-is-valid */
// author: @iamtienng
// this container is used to display the home page
import React from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./CSS/Home.css";

const Home = ({ isAuthenticated, adminAuthenticated }) => {
  // if the user is not authenticated, the home page will redirect to the login page
  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }
  // if the user is authenticated as an admin, the home page will redirect to the admin page
  else if (adminAuthenticated === true) {
    return <Navigate replace to="/admin" />;
  }

  return (
    <div className="container px-4 py-5 w-100" id="featured-3">
      <h2 className="pb-2 border-bottom">What do you want to do today?</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <Link to="/search" className="text-home">
          <div className="feature col navigate-container">
            <h3 className="fs-2 text-dark">Search for movies</h3>
            <p className="text-dark text-home">
              Please click here for searching.
            </p>
          </div>
        </Link>
        <Link to="/suggest" className="text-home">
          <div className="feature col navigate-container">
            <h3 className="fs-2 text-dark">Get suggested movies</h3>
            <p className="text-dark text-home">
              Please click here for getting suggested movies based on your
              taste.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps)(Home);
