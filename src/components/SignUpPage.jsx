//import React from 'react';
import React, {useState } from "react";
import './styles.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const SignUpPage = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    zipCode: '',
    agreeToTerms: false,
    username: '',
    password: '',
    confirmPassword: '',
    documents: null,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    // Handle form submission here (e.g., send data to an API or perform user registration)
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const boxStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'left', // Center align contents
  };

  const buttonStyle = {
    marginTop: '30px', // Adjust the top margin for vertical centering
    margin: '0 auto', // Center the button horizontally
  };

  return (
    <body class="body">
     <div>
      <h2 class="subheader">Sign Up Page</h2>
      {/* Add your sign-up form ,<Link to="/">Back to Home</Link> */}
      <div class="button-container">
      <button class="main-button">
      <Link class="header h5" to="/">Back to Home</Link>
      </button>
      </div>
     </div>
     <div style={containerStyle}>
      <div style={boxStyle}>
        <h3>Sign Up</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label className="text-right">First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label className="text-right">Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="address">
            <Form.Label className="text-right">Address</Form.Label>
            <Form.Control
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </Form.Group>

          <Form.Group controlId="zipCode">
            <Form.Label className="text-right">Zip Code</Form.Label>
            <Form.Control
              required
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Enter your zip code"
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label className="text-right">Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="text-right">Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className="text-right">Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
            />
          </Form.Group>

          <Form.Group controlId="documents">
            <Form.Label className="text-right">Upload Documents</Form.Label>
            <Form.Control
              type="file"
              name="documents"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="agreeToTerms">
            <Form.Check
              required
              name="agreeToTerms"
              label="I agree to the Terms and Conditions"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br></br>
          <div style={buttonStyle}>
            <Button variant="success" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
   </body>
  );
};

export default SignUpPage;
