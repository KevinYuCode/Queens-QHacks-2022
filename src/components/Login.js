import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { userQuery, Test } from "./userIngredients";
import { db, auth } from "../firebase/firebase";
//import "../styles/Login.css"

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      userQuery("UPDATE", auth.currentUser.email,  []);
      history("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="Login-page">
        <Card className="Login-card">
          <Card.Body>
            <h2 className="Login-header2"> Log In</h2>
            {error && <Alert variant="danger"> {error}</Alert>}
            <Form onSubmit={handleSubmit} className="Login-form">
              <Form.Group id="email">
                <Form.Label className="Login-input">Email:</Form.Label>
                <Form.Control
                  className="Login-field"
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label className="Login-input">Password:</Form.Label>
                <Form.Control
                  className="Login-field"
                  type="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button
                onClick={() => {}} // maybe this works idfk
                disabled={loading}
                className="Login-button"
                type="submit"
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
          <div className="Login-signup">
            Don't have an account?{" "}
            <Link to="/signup" className="Login-link">
              Signup
            </Link>
          </div>
        </Card>

        {/* <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup" className="Login-link">Signup</Link>

            </div> */}
      </div>
    </>
  );
}

export default Login;
