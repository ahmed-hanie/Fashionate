import React from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <BootstrapNavbar.Brand href="#home" className={styles.navbar__title}>
        Fashionate
      </BootstrapNavbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#logout" className={styles.navbar__item}>
          Logout
        </Nav.Link>
        <Nav.Link href="#login" className={styles.navbar__item}>
          Login
        </Nav.Link>
        <Nav.Link href="#createacc" className={styles.navbar__item}>
          Create an Account
        </Nav.Link>
        <Nav.Link href="#lel">
          <Badge color="secondary" badgeContent={1}>
            <ShoppingCartIcon />
          </Badge>
        </Nav.Link>
      </Nav>
    </BootstrapNavbar>
  );
};

export default Navbar;
