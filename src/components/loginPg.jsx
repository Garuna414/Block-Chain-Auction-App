import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function Login() {
  return (
    <div>
      <div className="logSignContainer">
        <form className="logSignForm">
          <p className="logSignText">Login</p>
          <div className="formGroup">
            <Form.Group controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your username"
              />
            </Form.Group>
          </div>

          <div className="formGroup">
            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
          </div>

          <div className="twoInputs">
            <div className="formGroup">
              <Form.Group>
                <Form.Control type="submit" className="srbutton" />
              </Form.Group>
            </div>

            <div className="formGroup">
              <Form.Group>
                <Form.Control type="reset" className="srbutton" />
              </Form.Group>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
