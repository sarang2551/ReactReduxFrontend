import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reusables/Button.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import {
  selectUserSessionDetails,
  deleteLoginSession
} from "../reduxOld/actions";
function Header(props) {
  const userSessionInfo = props.userSession;
  const onLogOutClick = (e) => {
    props.deleteLoginSession({ username: "", auth: false });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/">Personal Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/features">Features</Nav.Link>
          {userSessionInfo.auth ? (
            <Nav.Link href="/products">Products</Nav.Link>
          ) : null}
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form> */}
        {!userSessionInfo.auth ? (
          <Nav.Link href="/login-register">
            <Button variant="outline-info" title="Login">
              Login/Register
            </Button>
          </Nav.Link>
        ) : (
          <Nav.Link href="/">
            <Button
              variant="outline-info"
              title="LogOut"
              onClick={onLogOutClick}
            >
              LogOut
            </Button>
          </Nav.Link>
        )}
        {/* <Nav.Link href="/login-register">
          <Button variant="outline-primary" title="register">
            Register
          </Button>
        </Nav.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
export default connect(
  (state) => {
    return { ...state, userSession: state.reducer.userSession };
  },
  { selectUserSessionDetails, deleteLoginSession }
)(Header);
