import React, { useState, useRef } from "react";
import { Form, Button, Modal, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function ForgotPassword(props) {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");

    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container fluid>
      <div className="form-signin shadow-lg rounded">
        <Form onSubmit={onSubmit}>
          <h2 className="mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form.Group size="lg" controlId="email">
            <Form.Control
              autoFocus
              type="email"
              ref={emailRef}
              placeholder="Email"
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Reset Password
          </Button>
        </Form>

        <div className="w-100 text-center mt-2">
          <Link to="/">Login?</Link>
        </div>
      </div>
    </Container>
  );
}

export default ForgotPassword;
