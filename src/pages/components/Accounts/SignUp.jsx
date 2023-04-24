// import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import { ThreeDots } from "react-loader-spinner";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
import Logo from "../../../assets/Logo_PNG.svg";
const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // // load states from redux
  // const dispatch = useDispatch();
  // const loading = useSelector((state) => state.account.loading);
  // //   const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  // // destructure register data from state
  // const { password, email, name } = formData;

  // // create function to handle input onChange
  // const onChange = (event) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [event.target.name]: event.target.value,
  //   }));
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   //
  //   if (!password || !email || !name) {
  //     toast.error("Please complete all fields");
  //     return;
  //   }

  //   // dispatch(registerAccount(formData));
  // };

  // redirect to dashboard page if user is logged in

  return (
    <div className="container">
      <div className="img-container">
        <img src={Logo} alt="Logo" className="img-fluid mx-auto" />
      </div>
      <h1 className="fw-bold text-left heading">Sign Up</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            name="name"
            // onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            // value={email}
            // onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            // value={password}
            name="password"
            minLength={8}
            // onChange={onChange}
          />
        </Form.Group>

        <Button className="signup-btn" variant="primary" type="submit">
          Continue
          {/* <span className="tracking-[0.02em] text-white text-center font-bold text-3xl flex justify-center">
            {loading ? <ThreeDots color="#fff" height={27} /> : "Continue"}
          </span> */}
        </Button>
      </Form>
      <p className="text-center text-white ">Already have an account?</p>
    </div>
  );
};

export default SignUp;
