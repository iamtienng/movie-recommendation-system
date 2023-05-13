// author: @iamtienng
// high order component to wrap the app
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/Auth";
import { admin_check_authenticated, load_admin } from "../actions/Admin";

const Layout = ({
  checkAuthenticated,
  admin_check_authenticated,
  load_user,
  children,
  load_admin,
}) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
    admin_check_authenticated();
    load_admin();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default connect(null, {
  checkAuthenticated,
  admin_check_authenticated,
  load_user,
  load_admin,
})(Layout);
