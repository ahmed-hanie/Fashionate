import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../../api/auth";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onUsernameChange = (ev) => {
    setUsername(ev.target.value);
  };

  const onPasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const onConfirmPasswordChange = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const onEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const onFormSubmit = (ev) => {
    window.event.preventDefault();

    if (confirmPassword !== password) {
      setError("Passwords do not match");
      return;
    }

    const tryRegister = async () => {
      const response = await register({ username, password, email });
      if (response.status === 200) {
        setRegisterSuccess(true);
        setError(null);
      } else {
        setError("Something went wrong!");
      }
    };

    tryRegister();
  };

  return (
    <div className="d-flex justify-content-center">
      <div className={styles.container}>
        {registerSuccess ? (
          <div className="text-center">
            <h1>Register Success!</h1>
            <p> You can now login with your new account! </p>
            <Link to="/">
              <Button variant="primary" type="button">
                Go to Homepage
              </Button>
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <h1 className="text-center"> Register Accont </h1>
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

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={onConfirmPasswordChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={onEmailChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
              {error && <p className={`mt-2 ${styles.errorText}`}> {error} </p>}
            </Form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
