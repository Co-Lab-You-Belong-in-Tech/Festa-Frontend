import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignIn = () => {
  const navigate = useNavigate();
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" className="input-form" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" className="input-form" required />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="signup-btn"
          onClick={() => navigate("/discover")}
        >
          Continue
        </Button>
      </Form>
      <p className="text-center text-white mt-4">Forgot Password</p>
    </div>
  );
};

export default SignIn;
