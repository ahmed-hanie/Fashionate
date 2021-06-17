import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AdminCreateAccount.module.css";
import { createAdminAccount } from "../../api/auth";

const AdminCreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const onFormSubmit = () => {
    window.event.preventDefault();

    if (confirmPassword !== password) {
      setError("Passwords do not match");
      return;
    }

    const doCreateAccount = async () => {
      const response = await createAdminAccount({ username, password, email });
      if (response.status === 200) {
        setSuccess(true);
      } else {
        if (response.data.message) {
          setError(response.data.message);
        } else {
          setError("Something went wrong!");
        }
      }
    };

    doCreateAccount();
  };

  if (success) {
    return (
      <div className="p-5">
        <h1 className={styles.infoText}> Account created successfully! </h1>
        <Link to="/">
          <Button variant="primary"> Go Back </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1> Create New Admin Account </h1>
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
    </div>
  );
};

export default AdminCreateAccount;
