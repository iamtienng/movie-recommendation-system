// author: @iamtienng
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/Auth";
import "./CSS/Signup.css";

const Signup = ({ signup, isAuthenticated }) => {
  // get current date
  // this will be used to set the default value of the birth date
  let today = new Date();
  let date = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();

  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
    gender: "",
    birth_date: `${date}-${month}-${year}`,
  });

  const {
    first_name,
    last_name,
    email,
    password,
    re_password,
    gender,
    birth_date,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeGender = (e) => {
    if (e.target.id === "female") {
      setFormData({ ...formData, gender: "F" });
    } else {
      setFormData({ ...formData, gender: "M" });
    }
  };

  const onChangeBirthday = (e) => {
    if (e.target.id === "selectDate") {
      date = e.target.value;
    } else if (e.target.id === "selectMonth") {
      month = e.target.value;
    } else if (e.target.id === "selectYear") {
      year = e.target.value;
    }
    setFormData({ ...formData, birth_date: `${date}-${month}-${year}` });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(
        first_name,
        last_name,
        email,
        password,
        re_password,
        gender,
        birth_date
      ).then(function (result) {
        if (result !== "created") {
          // console.log(result);
        } else {
          setAccountCreated(true);
        }
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }
  if (accountCreated) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className="container-signup">
      <div className="title-signup">
        <h1>MRSBB</h1>
        <h2>Movie Recommendation System By Bot</h2>
      </div>
      <div className="shadow p-3 mb-5 bg-body rounded">
        <h1>Sign Up</h1>
        <p>Create your Account</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row g-3">
            <div className="form-group mb-3 col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="First Name*"
                name="first_name"
                value={first_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group mb-3 col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Last Name*"
                name="last_name"
                value={last_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              autoComplete="off"
              type="email"
              placeholder="Email*"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              autoComplete="new-password"
              type="password"
              placeholder="Password*"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password*"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="d-flex justify-content-start">
            <label
              className="align-self-center"
              style={{ width: 100, height: 36 }}
            >
              Birthday
            </label>
            <div className="d-flex justify-content-between">
              <select
                className="form-select mb-3"
                id="selectDate"
                defaultValue={date}
                onChange={(e) => onChangeBirthday(e)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select
                className="form-select mb-3"
                id="selectMonth"
                defaultValue={month - 1}
                onChange={(e) => onChangeBirthday(e)}
              >
                <option value="0">Jan</option>
                <option value="1">Feb</option>
                <option value="2">Mar</option>
                <option value="3">Apr</option>
                <option value="4">May</option>
                <option value="5">Jun</option>
                <option value="6">Jul</option>
                <option value="7">Aug</option>
                <option value="8">Sep</option>
                <option value="9">Oct</option>
                <option value="10">Nov</option>
                <option value="11">Dec</option>
              </select>
              <select
                className="form-select mb-3"
                id="selectYear"
                defaultValue={year}
                onChange={(e) => onChangeBirthday(e)}
              >
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
                <option value="1949">1949</option>
                <option value="1948">1948</option>
                <option value="1947">1947</option>
                <option value="1946">1946</option>
                <option value="1945">1945</option>
                <option value="1944">1944</option>
                <option value="1943">1943</option>
                <option value="1942">1942</option>
                <option value="1941">1941</option>
                <option value="1940">1940</option>
                <option value="1939">1939</option>
                <option value="1938">1938</option>
                <option value="1937">1937</option>
                <option value="1936">1936</option>
                <option value="1935">1935</option>
                <option value="1934">1934</option>
                <option value="1933">1933</option>
                <option value="1932">1932</option>
                <option value="1931">1931</option>
                <option value="1930">1930</option>
                <option value="1929">1929</option>
                <option value="1928">1928</option>
                <option value="1927">1927</option>
                <option value="1926">1926</option>
                <option value="1925">1925</option>
                <option value="1924">1924</option>
                <option value="1923">1923</option>
                <option value="1922">1922</option>
                <option value="1921">1921</option>
                <option value="1920">1920</option>
                <option value="1919">1919</option>
                <option value="1918">1918</option>
                <option value="1917">1917</option>
                <option value="1916">1916</option>
                <option value="1915">1915</option>
                <option value="1914">1914</option>
                <option value="1913">1913</option>
                <option value="1912">1912</option>
                <option value="1911">1911</option>
                <option value="1910">1910</option>
                <option value="1909">1909</option>
                <option value="1908">1908</option>
                <option value="1907">1907</option>
                <option value="1906">1906</option>
                <option value="1905">1905</option>
              </select>
            </div>
          </div>
          <label style={{ width: 100 }}>Gender</label>
          <div
            className="form-check form-check-inline mb-3"
            style={{
              border: "black",
            }}
          >
            <input
              className="form-check-input"
              type="radio"
              name="Gender"
              id="female"
              onChange={(e) => onChangeGender(e)}
              required
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="Gender"
              id="male"
              onChange={(e) => onChangeGender(e)}
              required
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Male
            </label>
          </div>

          <div className="align-self-center">
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
              Sign Up
            </button>
          </div>
        </form>
        <hr />
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
