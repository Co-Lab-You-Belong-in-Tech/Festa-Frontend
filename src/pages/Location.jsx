import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./Location.css";
const Location = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
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
      <h2 className="heading text-center">Find events happening near you</h2>
      <div className="img-wrapper">
        <img src="/assets/map 1.svg" alt="" />
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Your ZIP Code"
          aria-label="Your ZIP Code"
          aria-describedby="basic-addon1"
          className="zip-input"
          value={value}
          onChange={handleChange}
        />
      </InputGroup>
      <Button variant="primary" type="submit" className="signup-btn">
        Continue
      </Button>
      <p className="text-center text-white">Skip for now</p>
    </div>
  );
};

export default Location;
