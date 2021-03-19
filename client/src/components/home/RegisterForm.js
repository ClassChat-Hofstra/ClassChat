import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Modal, Alert } from "react-bootstrap";

function RegisterForm(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const history = useHistory();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  // const [show, setShow] = useState(true);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  function onChange(e) {
    setRegisterState((prevValue) => {
      if (e.target.id === "email") {
        return {
          email: e.target.value,
          password: prevValue.password,
          password2: prevValue.password2,
          name: prevValue.name,
          errors: prevValue.errors,
        };
      } else if (e.target.id === "password") {
        return {
          email: prevValue.email,
          password: e.target.value,
          password2: prevValue.password2,
          name: prevValue.name,
          errors: prevValue.errors,
        };
      } else if (e.target.id === "password2") {
        return {
          email: prevValue.email,
          password: prevValue.password,
          password2: e.target.value,
          name: prevValue.name,
          errors: prevValue.errors,
        };
      } else if (e.target.id === "name") {
        return {
          email: prevValue.email,
          password: prevValue.password,
          password2: prevValue.password2,
          name: e.target.value,
          errors: prevValue.errors,
        };
      }
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== password2Ref.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      history.push("/edit-courses");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <Modal
      size="sm"
      show={props.modalOpen}
      onHide={props.handleModalOpen}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group size="lg" controlId="name">
            <Form.Control
              autoFocus
              ref={nameRef}
              onChange={onChange}
              value={registerState.name}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Control
              autoFocus
              ref={emailRef}
              onChange={onChange}
              value={registerState.email}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Control
              ref={passwordRef}
              onChange={onChange}
              value={registerState.password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password2">
            <Form.Control
              ref={password2Ref}
              onChange={onChange}
              value={registerState.password2}
              type="password"
              placeholder="Repeat Password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleModalOpen}>
            Close
          </Button>
          <Button disabled={loading} type="submit" variant="success">
            Create your Account
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RegisterForm;
