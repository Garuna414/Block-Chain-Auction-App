import React from "react";
import "./styles.css";
import { BrowserRouter, Routes, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

function signUp() {
  return (
    <div>
      <div className="logSignContainer">
        <form className="logSignForm">
          <p className="logSignText">Register</p>
          <div className="twoInputs">
            <div className="formGroup">
              <Form.Group controlId="FName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>
            </div>
            <div className="formGroup">
              <Form.Group controlId="LName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>
            </div>
          </div>
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
            <Form.Group controlId="Address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your address"
              />
            </Form.Group>
          </div>

          <div className="formGroup">
            <Form.Group controlId="ZIP">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control required type="text" placeholder="Enter ZIP Code" />
            </Form.Group>
          </div>

          <div className="twoInputs">
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

            <div className="formGroup">
              <Form.Group controlId="RePassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Re-enter password"
                />
              </Form.Group>
            </div>
          </div>

          <div className="twoInputs">
            <div className="formGroup">
              <Form.Group>
                <Form.Control type="submit" className="srbutton"/>
              </Form.Group>
            </div>

            <div className="formGroup">
              <Form.Group>
                <Form.Control type="reset" className="srbutton"/>
              </Form.Group>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default signUp;
