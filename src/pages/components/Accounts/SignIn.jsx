import { Button, Form } from "react-bootstrap";
import Logo from "../../assets/Logo_PNG.svg";

const SignIn = () => {
  return (
    <div>
      <img src={Logo} alt="Logo" />
      <h2>Sign In</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
      <p className="text-base underline tracking-[0.02em] text-[inherit] inline-block text-center mb-2">
        Forgot Password
      </p>
    </div>
  );
};

export default SignIn;
