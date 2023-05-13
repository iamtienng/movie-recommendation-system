// author: @iamtienng
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
// import "./CSS/Login.css";
import { admin_load_users_list } from "../../actions/Admin";
import AdminUsersList from "../../components/AdminUsersList";
import Heading from "../../components/Heading";

const AdminUsersManagement = ({
  admin_load_users_list,
  isAuthenticated,
  adminAuthenticated,
}) => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    admin_load_users_list().then(function (result) {
      if (result !== false) {
        setusers(result);
      }
    });
  }, [admin_load_users_list]);

  if (isAuthenticated === false || adminAuthenticated === false) {
    return <Navigate replace to="/admin/login" />;
  }

  return (
    <div>
      <Heading heading="Users Management" />
      <p>Click to a row to turn into specific user page.</p>
      <AdminUsersList users={users} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  adminAuthenticated: state.Auth.adminAuthenticated,
});

export default connect(mapStateToProps, { admin_load_users_list })(
  AdminUsersManagement
);
