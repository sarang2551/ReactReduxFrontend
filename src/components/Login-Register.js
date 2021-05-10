import React from "react";
import "./reusables/login.scss";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import GlobalMessageHandler from "./reusables/globalMessageHandler";
import LoginBox from "./Login";
import RegisterBox from "./Register";
export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      renderLoginMessage: false,
      errorProps: {},
      redirect: null,
      resData: {},
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }
  mySubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const userInfo = {
        username: this.state.username,
        password: this.state.password
      };
      console.log("userInfo", userInfo);
      Axios.post("http://localhost:3000/login", userInfo).then((res) => {
        let loginProps = null;
        const { username, loginStatus } = res.data;
        switch (loginStatus) {
          case "success":
            this.setState({ redirect: "/user_homePage", resData: res.data });
            console.log("res.data ", res.data);
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
    } catch (e) {
      console.log(e);
    }
  };

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
        <div className="root-container">
          <div className="box-controller">
            <div
              className={
                "controller " +
                (this.state.isLoginOpen ? "selected-controller" : "")
              }
              onClick={this.showLoginBox.bind(this)}
            >
              Login
            </div>
            <div
              className={
                "controller " +
                (this.state.isRegisterOpen ? "selected-controller" : "")
              }
              onClick={this.showRegisterBox.bind(this)}
            >
              Register
            </div>
          </div>

          <div className="box-container">
            {this.state.isLoginOpen && <LoginBox />}
            {this.state.isRegisterOpen && <RegisterBox />}
          </div>
        </div>
        <GlobalMessageHandler />
      </>
    );
  }
}
