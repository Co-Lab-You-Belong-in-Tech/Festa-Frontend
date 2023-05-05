import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config";
import "./SignUp.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the user's login credentials
    const credentials = {
      email: email,
      password: password,
    };

    // Make an API call to the backend for user authentication
    axios
      .post(`${API_URL}/api/v1/auth/login`, credentials)
      .then((response) => {
        // Authentication successful
        toast.success("Authentication successful");
        // Store the authorization token in local storage or state for future API calls
        localStorage.setItem("authToken", response.data.payload.token);
        navigate("/discover");
      })
      .catch((error) => {
        // Authentication failed
        setError("Email address or password is invalid");
        toast.error("Email address or password is invalid");
      });
  };
  return (
    <div className="container">
      <div className="img-container">
        <img
          src="/assets/Logo_PNG.svg"
          alt="Logo"
          className="img-fluid mx-auto"
        />
      </div>
      <h2 className="fw-bold text-left heading">Sign In</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="input-form"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="input-form"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="signup-btn">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
