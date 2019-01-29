import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import classes from "./Header.css";
import { LinkContainer } from "react-router-bootstrap";

const header = () => {
    return (
      <div className={classes.Header}>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand className={classes.Brand}>
                <LinkContainer to="/">
                    <NavItem>Invoice App</NavItem>
                </LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullLeft>
            <LinkContainer to="/customers">
                <NavItem>Customers</NavItem>
            </LinkContainer>
            <LinkContainer to="/products">
                <NavItem>Products</NavItem>
            </LinkContainer>
            <LinkContainer to="/invoices">
                <NavItem>Invoice List</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        
      </div>
    );
}

export default header;
