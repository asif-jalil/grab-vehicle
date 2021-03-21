import React from "react";
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InfoContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedUser] = useContext(InfoContext);

  return (
    <header>
      <Navbar expand="lg">
        <Link to="/">
          <Navbar.Brand>GRAB VEHICLE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/destination">
              Destination
            </Link>
            <Link className="nav-link" to="/blog">
              Blog
            </Link>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
            {loggedUser.isLogged ? (
              <h6 className="nav-link nav-acc">{loggedUser.name || loggedUser.email}</h6>
            ) : (
              <Link className="nav-link btn main-btn" to="/login">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
