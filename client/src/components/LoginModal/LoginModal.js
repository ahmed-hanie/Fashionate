import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { login as apiLogin } from "../../api/auth";
import AuthContext from "../../context/AuthContext";
import styles from "./LoginModal.module.css";
import { login } from "../../utility/authHandler";

const LoginModal = (props) => {
  const [, setAuthData] = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onUsernameChange = (ev) => {
    setUsername(ev.target.value);
  };

  const onPasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const onFormSubmit = (ev, values) => {
    window.event.preventDefault();

    const performLogin = async () => {
      const response = await apiLogin({ username, password });
      if (response.status === 200) {
        login(setAuthData, response);
        setError(null);
        if (props.onLoginSuccess) {
          props.onLoginSuccess();
        }
      } else {
        if (response.data.message) {
          setError(response.data.message);
        } else {
          setError("Something went wrong!");
        }
      }
    };

    performLogin();
  };

  return (
    <Modal show={props.show} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={onUsernameChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="d-inline">
            Submit
          </Button>
          {error ? (
            <p className={`ml-3 d-inline ${styles["modal__text--error"]}`}>
              {error}
            </p>
          ) : null}
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
