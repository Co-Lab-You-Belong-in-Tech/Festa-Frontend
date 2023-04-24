import { Button, Form } from "react-bootstrap";
import Logo from "../../../assets/Logo_PNG.svg";
import "./SignUp.css";

const SignIn = () => {
  return (
    <div className="container">
      <div className="img-container">
        <img src={Logo} alt="Logo" className="img-fluid mx-auto" />
      </div>
      <h2 className="fw-bold text-left heading">Sign In</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Button variant="primary" type="submit" className="signup-btn">
          Continue
        </Button>
      </Form>
      <p className="text-center text-white">Forgot Password</p>
    </div>
  );
};

export default SignIn;
