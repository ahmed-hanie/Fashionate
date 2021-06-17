import React, { useContext, useState } from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import LoginModal from "../LoginModal/LoginModal";
import styles from "./Navbar.module.css";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import { logout } from "../../utility/authHandler";

const Navbar = () => {
  const [authData, setAuthData] = useContext(AuthContext);
  const [cartItemsNum, setCartItemsNum] = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const onLogoutLinkClick = () => {
    logout(setAuthData);
    setCartItemsNum(0);
    history.push("/");
  };

  const onLoginLinkClick = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onLoginSuccess = () => {
    setShowModal(false);
  };

  let navbarItems = null;
  if (authData.authenticated) {
    const roles = authData.data.roles.split(",");
    if (roles.includes("admin")) {
      navbarItems = (
        <Nav.Link className={styles.navbar__item} onClick={onLogoutLinkClick}>
          Logout
        </Nav.Link>
      );
    } else {
      navbarItems = (
        <React.Fragment>
          <Nav.Link className={styles.navbar__item} onClick={onLogoutLinkClick}>
            Logout
          </Nav.Link>
          <Nav.Link className={styles.navbar__item}>View Orders</Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <Badge color="secondary" badgeContent={cartItemsNum}>
              <ShoppingCartIcon />
            </Badge>
          </Nav.Link>
        </React.Fragment>
      );
    }
  } else {
    navbarItems = (
      <React.Fragment>
        <Nav.Link className={styles.navbar__item} onClick={onLoginLinkClick}>
          Login
        </Nav.Link>
        <Nav.Link as={Link} to="/register" className={styles.navbar__item}>
          Create an Account
        </Nav.Link>
        <Nav.Link as={Link} to="/cart">
          <Badge color="secondary" badgeContent={cartItemsNum}>
            <ShoppingCartIcon />
          </Badge>
        </Nav.Link>
      </React.Fragment>
    );
  }

  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <BootstrapNavbar.Brand to="/" as={Link} className={styles.navbar__title}>
        Fashionate
      </BootstrapNavbar.Brand>
      <Nav className="ml-auto">{navbarItems}</Nav>
      <LoginModal
        show={showModal}
        onModalClose={onModalClose}
        onLoginSuccess={onLoginSuccess}
      />
    </BootstrapNavbar>
  );
};

export default Navbar;
