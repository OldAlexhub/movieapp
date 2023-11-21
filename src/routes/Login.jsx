import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [formData, setFormDate] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);
      const { token, username, role, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("username", username, { expires: 7 });
      Cookies.set("role", role, { expires: 7 });
      Cookies.set("userId", userId, { expires: 7 });
      navigate("/mysearchpage");
    } catch (error) {
      console.log(error);
      setMessage({
        type: `Error`,
        content: `Login failed. Please check your username and password.`,
      });
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <img src={Logo} alt="logo" className="img-fluid" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <p className="mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register Now
              </Link>
            </p>
          </form>
          {message && (
            <div className="alert alert-danger mt-3">{message.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
