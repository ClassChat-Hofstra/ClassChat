import React, { useState, useRef } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import logoImg from "../../assets/img/logo.svg";
import RegisterForm from "./RegisterForm";

function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function onSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="form-signin shadow-lg rounded">
      <Form onSubmit={onSubmit}>
        <img
          className="mb-4"
          src={logoImg}
          alt=""
          width="72"
          height="72"
          style={{
            filter:
              "invert(26%) sepia(20%) saturate(5151%) hue-rotate(234deg) brightness(76%) contrast(165%)",
          }}
        />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group size="lg" controlId="email">
          <Form.Control
            onChange={onChange}
            autoFocus
            type="email"
            ref={emailRef}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Control
            onChange={onChange}
            type="password"
            ref={passwordRef}
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
      <div className="w-100 text-center mt-2">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default LoginForm;
