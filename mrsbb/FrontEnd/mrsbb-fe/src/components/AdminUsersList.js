// author: @iamtienng
// this component is used to display the list of users
// as a table in admin UI
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminUsersList = (props) => {
  let navigate = useNavigate();
  const navigateToMoviePage = (user) => {
    let path = `/admin/users/${user.id}`;
    navigate(path);
  };
  return (
    <>
      <table className="table table-dark table-striped table-hover ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Surname</th>
            <th scope="col">Name</th>
            <th scope="col">Birth Day</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr
              key={index}
              onClick={() => {
                navigateToMoviePage(user);
              }}
              cursor="pointer"
            >
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.surname}</td>
              <td>{user.name}</td>
              <td>{user.birth_date}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminUsersList;
