import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  Button
} from "reactstrap";

class InternalNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humbergerOpen: true
    };
  }
  render() {
    const { humbergerOpen } = this.state;
    return (
      <Navbar light color="primary">
        <NavbarBrand href="/" className="mr-auto">
          Sahabat
        </NavbarBrand>
        <Form>
          <input type="text" placeholder="Search" className="mr-2" />
        </Form>
        <NavbarToggler
          className="mr-2 ml-2"
          onClick={() => this.setState({ humbergerOpen: !humbergerOpen })}
        />
        <Collapse isOpen={!humbergerOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/signin">Sign In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default InternalNavbar;
