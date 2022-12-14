import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import logo from "./Logo.png";

function NavBar(props) {
  const logout = () => {
    axios.post("/user/logout");
    props.newCurrentUser("");
  };

  const getCurrentUser = async () => {
    try {
      const user = await axios.get("/user/current");
      props.newCurrentUser(user.data);
    } catch (e) {}
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

    return (
        <Navbar expand="md" className='navbar'>
        <Container>
            <Link className='Nav-Link' to={"/"}><Navbar.Brand><img className='Nav-Logo' src={logo} alt=""></img></Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link className='Nav-Link' to={"/"} key={"home"}>Home</Link>
                {props.currentUser !== '' ? (
                    <Link className='Nav-Link' to={"/product/add"} key={"add"}>New Product</Link>
                ) : ('')}
            </Nav>
            <Nav>

            </Nav>
            {props.currentUser !== '' ? (
                [
                    <Link className='Nav-Link' to={`/profile/${props.currentUser._id}`} key={"profile"}>{props.currentUser.name}</Link>,
                    <div className='Nav-Link' onClick={logout} >Logout</div>
                ]
            ) : (
                [
                    <Link className='Nav-Link' to={"/login"} key={"login"}>Login</Link>,
                    <Link className='Nav-Link' to={"/register"} key={"register"}>Register</Link>,
                ]
            )}
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavBar;
