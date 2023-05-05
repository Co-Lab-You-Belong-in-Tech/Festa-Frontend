import { useState } from "react";
// import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { ThreeDots } from "react-loader-spinner";

import { toast } from "react-toastify";
import API_URL from "../../config";
// import { useSelector, useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name.split(" ")[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the user's signup data
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    // Make an API call to the backend for user signup
    axios
      .post(`${API_URL}/api/v1/auth/signup`, userData)
      .then((response) => {
        // Signup successful

        toast.success("Signup successful");
        navigate("/choose-artist");
      })
      .catch((error) => {
        // Signup failed
        if (error.response && error.response.status === 409) {
          setError("Email address is already registered");
        } else {
          setError("Signup failed");
        }
      });
  };

  // const handleVerifyCode = () => {
  //   const verificationData = {
  //     email: email,
  //     code: verificationCode,
  //   };

  //   // Make an API call to the backend to verify the code
  //   axios
  //     .post(
  //       "https://festa-api.herokuapp.com/api/v1/auth/verify",
  //       verificationData
  //     )
  //     .then((response) => {
  //       // Verification successful
  //       const { authToken } = response.data;
  //       console.log(authToken);
  //       toast.success("Verification successful");
  //       // Save the authToken in local storage or state for later use
  //       // Redirect the user to the login page or perform any other action
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       // Verification failed
  //       setError("Verification failed");
  //     });
  // };

  return (
    <div className="container">
      <div className="img-container">
        <img
          src="/assets/Logo_PNG.svg"
          alt="Logo"
          className="img-fluid mx-auto"
        />
      </div>
      <h1 className="fw-bold text-left heading">Sign Up</h1>

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            name="name"
            required
            className="input-form"
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            className="input-form"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="password"
            minLength={6}
            className="input-form"
            required
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button className="signup-btn" variant="primary" type="submit">
          Continue
          {/* <span className="tracking-[0.02em] text-white text-center font-bold text-3xl flex justify-center">
            {loading ? <ThreeDots color="#fff" height={27} /> : "Continue"}
          </span> */}
        </Button>
      </Form>

      {/* {verificationCode && (
        <div>
          <Form.Group className="mb-3" controlId="formBasicCode">
            <Form.Label>Verification Code</Form.Label>
            <Form.Control
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            className="verify-btn"
            variant="primary"
            onClick={handleVerifyCode}
          >
            Verify
          </Button>
        </div>
      )} */}

      <p
        onClick={() => navigate("/login")}
        className="text-center text-white mt-4"
      >
        Already have an account?
      </p>
    </div>
  );
};

export default SignUp;
