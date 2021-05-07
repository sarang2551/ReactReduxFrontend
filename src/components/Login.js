import React from "react";
import { Redirect } from "react-router-dom";
import "./reusables/login.scss";
import { verifyUser } from "./Api";
import { connect } from "react-redux";
import { addLoginSession } from "../reduxOld/actions";
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
    console.log(userInfo);
    verifyUser(userInfo).then((res) => {
      let loginProps = null;
      const { username, loginStatus } = res.data;
      console.log("res.data ", res.data);
      switch (loginStatus) {
        case "success":
          this.props.addLoginSession({ username, auth: true });
          this.setState({ redirect: "/", resData: res.data });
          return;
        case "failed":
          loginProps = {
            type: "failed",
            content: `${username} login failed. Incorrect password!`
          };
          this.setState({
            errorProps: loginProps,
            renderLoginMessage: true
          });
          return;
        case "notFound":
          loginProps = { type: "warn", content: `User could not be found!` };
          this.setState({
            errorProps: loginProps,
            renderLoginMessage: true
          });
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
export default connect(null, { addLoginSession })(LoginBox);
