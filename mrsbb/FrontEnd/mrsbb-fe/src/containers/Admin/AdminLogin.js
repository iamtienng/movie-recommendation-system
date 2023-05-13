// author: @iamtienng
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { admin_login } from "../../actions/Admin";

const Login = ({ admin_login, isAuthenticated, adminAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    admin_login(email, password).then(function (result) {
      if (result !== null) {
        alert(result);
      }
    });
  };

  if (adminAuthenticated && isAuthenticated) {
    return <Navigate replace to="/admin" />;
  }

  return (
    <div className="container-login">
      <div className="title-login">
        <h1>MRSBB</h1>
        <h2>Admin</h2>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps, { admin_login })(Login);
