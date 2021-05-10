import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reusables/Button.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import { sessionService } from "redux-react-session";
function Header(props) {
  const onLogOutClick = (e) => {
    sessionService.deleteUser().then(() => {
      sessionService.deleteSession();
    });
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/">Personal Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/features">Features</Nav.Link>
          {props.userSession.authenticated ? (
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
        {!props.userSession.authenticated ? (
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
export default connect((state) => {
  return { userSession: state.session };
}, null)(Header);
