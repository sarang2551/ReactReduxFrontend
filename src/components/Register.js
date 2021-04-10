import React from "react";
import "./reusables/login.scss";
import { registerUser } from "./Api";

export default class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      isShowErrorComponent: false,
      errorProps: {}
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  submitRegister(e) {
    e.preventDefault();
    var userInfo = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    console.log(userInfo);
    registerUser(userInfo).then((res) => {
      console.log("res.data", res.data);
      const { username, success } = res.data;
      let errorProps = null;

      if (success === "registered") {
        errorProps = {
          type: "success",
          content: `${username} is successfully registered!`
        };
      }

      if (success === "failed") {
        errorProps = {
          type: "error",
          content: `Failed to registered ${username}`
        };
      }

      if (success === "duplicate") {
        errorProps = {
          type: "warn",
          content: `${username} already exists`
        };
      }

      this.setState({ errorProps: errorProps, isShowErrorComponent: true });
    });
  }

  render() {
    return (
      <>
        <div className="inner-container">
          <div className="header">Register</div>
          <div className="box">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="login-input"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="button"
              className="login-btn"
              onClick={this.submitRegister.bind(this)}
            >
              Register
            </button>
          </div>
        </div>
      </>
    );
  }
}
