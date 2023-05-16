import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginAccount } from "../../redux/features/account/accountSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SignUp.css";
import AppLayout from "../../components/Layout/AppLayout";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the user's login credentials
    const credentials = {
      email: email,
      password: password,
    };

    try {
      dispatch(loginAccount(credentials)).then(() => {
        navigate("/discover");
      });
      toast.success("Authentication successful");
    } catch (error) {
      setError("Email address or password is invalid");
      toast.error("Email address or password is invalid");
    }
  };
  return (
    <AppLayout renderNav={false}>
      <div className="container row d-flex justify-content-center">
        <div className="col-12 col-md-6">
          <div className="img-container d-grid d-md-none">
            <img
              src="/assets/Logo_PNG.svg"
              alt="Logo"
              className="img-fluid mx-auto"
            />
          </div>
          <div className="bottom-wrap">
            <div>
              <h2 className="fw-bold text-left signup-heading">Sign In</h2>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignIn;
