// author: @iamtienng
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/Auth";
import "./CSS/Login.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password).then(function (result) {
      if (result !== null) {
        alert(result);
      }
    });
  };

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container-login">
      <div className="title-login">
        <h1>MRSBB</h1>
        <h2>Movie Recommendation System By Bot</h2>
      </div>
      <div
        className="shadow p-3 mb-5 bg-body rounded align-middle"
        style={{ width: 396 }}
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-3">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              id="inputEmail"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
              style={{ fontSize: 17, height: 52 }}
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              id="inputPassword"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
              style={{ fontSize: 17, height: 52 }}
            />
          </div>
          <div>
            <button
              className="btn btn-primary btn-block btn-lg col-12 font-weight-bold"
              type="submit"
              style={{
                border: "none",
                backgroundColor: "black",
                fontWeight: "bold",
                fontSize: 20,
                height: 48,
              }}
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mt-3 col-12 text-center">
          <Link
            to="/reset-password"
            className="text-decoration-none"
            style={{ fontWeight: 500, fontSize: 14, height: 48 }}
          >
            Forgot password?
          </Link>
        </p>
        <hr />
        <div className="col text-center">
          <Link to="/signup" className="text-center">
            <button
              className="btn btn-secondary btn-block btn-lg col-6 mt-2 mb-2"
              style={{
                border: "none",
                fontSize: 17,
                width: 200,
              }}
            >
              Create new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
