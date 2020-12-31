import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function LoginForm(props) {

  
  const [modalOpen, setModalOpen] = useState({
    modalOpen: false,
  });

  function handleModalOpen() {
    setModalOpen((prevState) => {
      return {
        modalOpen: !prevState.modalOpen,
      };
    });
  }

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  function onChange(e) {
    // console.log("Name: " + e.target.id);
    setLoginState((prevValue) => {
      if (e.target.id === "email") {
        return {
          email: e.target.value,
          password: prevValue.password,
          errors: prevValue.errors,
        };
      } else if (e.target.id === "password") {
        return {
          email: prevValue.email,
          password: e.target.value,
          errors: prevValue.errors,
        };
        // } else if (e.target.id === "errors") {
        //   return {
        //     email: prevValue.email,
        //     password: prevValue.password,
        //     errors: e.target.value,
        //   };
      }
    });
  }


  function onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: loginState.email,
      password: loginState.password,
    };

    console.log(userData);
  }

  return (
    <div className="form-signin shadow-lg rounded">
      <Form onSubmit={onSubmit}>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <Form.Group size="lg" controlId="email">
          <Form.Control
            onChange={onChange}
            autoFocus
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            onChange={onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>

          <Button
            style={{ marginTop: "8px" }}
            onClick={handleModalOpen}
            variant="success"
            block
            size="lg"
            type="button"
          >
            Create an Account
          </Button>

      </Form>
      <RegisterForm
        modalOpen={modalOpen.modalOpen}
        handleModalOpen={handleModalOpen}
      />
    </div>
  );
}


export default LoginForm;
