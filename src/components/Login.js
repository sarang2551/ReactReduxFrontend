import React from "react";
import { Redirect } from "react-router-dom";
import "./reusables/login.scss";
import { verifyUser } from "./Api";
import { connect } from "react-redux";
import { displayMessage } from "../reduxOld/actions";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      resData: {},
      redirect: "",
      errorProps: {},
      renderLoginMessage: false
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  submitLogin(e) {
    e.preventDefault();
    var userInfo = {
      username: this.state.username,
      password: this.state.password
    };
    verifyUser(userInfo).then((res) => {
      let loginProps = null;
      const { username, loginStatus } = res.data;
      console.log("res.data ", res.data);
      switch (loginStatus) {
        case "success":
          window.localStorage.setItem(
            "session",
            JSON.stringify({ username, auth: true })
          );
          this.setState({ redirect: "/", resData: res.data });
          break;
        case "failed":
          loginProps = {
            type: "failed",
            message: `${username} login failed. Incorrect password!`,
            show: true
          };
          this.props.displayMessage(loginProps);
          return;
        case "notFound":
          loginProps = {
            type: "warn",
            message: `User could not be found!`,
            show: true
          };
          this.props.displayMessage(loginProps);
          return;
        default:
          return <div></div>;
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{ pathname: this.state.redirect, state: this.state.resData }}
        />
      );
    }
    return (
      <>
        <div className="inner-container">
          <div className="header">Login</div>
          <div className="box">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                required
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                required
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
              onClick={this.submitLogin.bind(this)}
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default connect(null, { displayMessage })(LoginBox);
