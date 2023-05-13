/* eslint-disable jsx-a11y/anchor-is-valid */
// author: @iamtienng
import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./CSS/AdminHome.CSS";

const AdminHome = ({ isAuthenticated, adminAuthenticated }) => {
  if (isAuthenticated === false && adminAuthenticated === false) {
    return <Navigate replace to="/admin/login" />;
  }

  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">What do you want to do today?</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
          <h3 className="fs-2">Manage Users</h3>
          <a href="/admin/users" className="d-inline-flex align-items-center">
            Go to Users Management
          </a>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
          <h3 className="fs-2">Manage Movies</h3>
          <a
            href="/admin/movies"
            className="icon-link d-inline-flex align-items-center"
          >
            Go to Movies Management
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps)(AdminHome);
