import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

function LoginForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="form-signin shadow-lg rounded">
      <Form>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <Form.Group size="lg" controlId="email">
          <Form.Control autoFocus type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
        <Button
          onClick={() => handleShow(true)}
          variant="success"
          block
          size="lg"
          type="button"
        >
          Create an Account
        </Button>
      </Form>
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group size="lg" controlId="registerName">
              <Form.Control autoFocus type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group size="lg" controlId="registerEmail">
              <Form.Control autoFocus type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group size="lg" controlId="registerPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group size="lg" controlId="repeatPassword">
              <Form.Control type="password" placeholder="Repeat Password" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success">Create your Account</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default LoginForm;
