// author: @iamtienng
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
// import "./CSS/MoviePage.css";

import Heading from "../../components/Heading";

const UserPage = ({ isAuthenticated }) => {
  const [user, setUser] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  const userId = parseInt(useParams().id);

  const deleted_button = () => (
    <button className="btn btn-secondary" disabled>
      Deleted
    </button>
  );
  const delete_button = () => (
    <button
      className="btn btn-danger"
      type="submit"
      onClick={delete_user_request}
    >
      Delete
    </button>
  );
  const check_user_deleted = (email) => {
    if (email.slice(-8) === "_deleted") {
      return true;
    }
    return false;
  };

  const delete_user_request = async () => {
    const url = `${process.env.REACT_APP_API_URL}/admin/users/${userId}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        // prettier-ignore
        'Authorization': `JWT ${localStorage.getItem("access")}`,
      },
    });
    await response.response;

    if (response.status === 200) {
      alert("User deleted successfully");
      setIsDeleted(true);
    }
  };

  useEffect(() => {
    const getUserRequest = async () => {
      const url = `${process.env.REACT_APP_API_URL}/admin/users/${userId}/`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          'Authorization': `JWT ${localStorage.getItem("access")}`,
          // prettier-ignore
          'Accept': 'application/json',
        },
      });
      const responseJson = await response.json();

      if (responseJson) {
        setUser(responseJson);
        setIsDeleted(check_user_deleted(responseJson.email));
      }
    };
    getUserRequest();
  }, [userId, isDeleted]);

  if (isAuthenticated === false) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="container-fluid movie-app">
      <div className="d-flex justify-content-between mt-4 mb-4 ">
        <Heading heading={"User ID: " + user.id} />
      </div>
      <div className="row row-cols-auto">
        <div className="d-flex justify-content-start m-3"></div>
        <div className="m-4 col">
          <h3> - - </h3>
          <h2>Name - Surname:</h2>
          <h3>{user.name + " " + user.surname}</h3>
          <h3> - - </h3>
          <h2>Email:</h2>
          <h3>{user.email}</h3>
          <h3> - - </h3>
          <h2>Birth Date:</h2>
          <h3>{user.birth_date}</h3>
          <h3> - - </h3>
          <h2>Gender:</h2>
          <h3>{user.gender === "M" ? "Male" : "Female"}</h3>
          <h3> - - </h3>
          <h3>{isDeleted ? deleted_button() : delete_button()}</h3>
          <h3> - - </h3>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(UserPage);
