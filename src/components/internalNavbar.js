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
  InputGroup,
  FormGroup,
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
      <Navbar light style={navbarStyling.mainComponent}>
        <NavbarBrand href="/" className="mr-auto">
          <img src="../../assets/logo_navbar.svg" height="40px"/>
        </NavbarBrand>
        <Form>
        <input placeholder="contoh: batik ..." id="Search" name="Search" type="search" style={navbarStyling.searchbar}/>
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

const navbarStyling = {
  mainComponent: {
    background: "#f8f9fa",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    position: "-webkit-sticky", 
    position: "sticky", 
    top: 0, 
    zIndex:999
  },
  searchbar: {
    width: "84%",
    borderRadius: "15px",
    fontSize: "12px",
    padding: "7px 12px",
    border: "1px solid #fff",
    marginRight: "10px",
    boxShadow: "inset 0 0 2px 2px #ecf0f1",
    float: "right",
    outline:0
  }
}

export default InternalNavbar;
