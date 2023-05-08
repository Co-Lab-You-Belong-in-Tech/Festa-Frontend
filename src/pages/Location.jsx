import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { LocationContext } from "./LocationContext";
import "./Location.css";

const Location = () => {
  const navigate = useNavigate();
  const [zipcode, setZipcode] = useState("");
  const { updateLocation, setIsLoading } = useContext(LocationContext);

  useEffect(() => {
    const storedZipcode = localStorage.getItem("zipcode");
    if (storedZipcode) {
      setZipcode(storedZipcode);
    }
  }, []);

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleLookup = () => {
    axios
      .get(`https://api.zippopotam.us/us/${zipcode}`)
      .then((response) => {
        const city = response.data.places[0]["place name"];
        const state = response.data.places[0]["state abbreviation"];
        updateLocation(city, state, zipcode);
        setIsLoading(true); // Set isLoading to true
        localStorage.setItem("zipcode", zipcode); // Store zipcode in localStorage
        navigate("/loading", { state: { zipcode } });
      })
      .catch((error) => {
        console.error(error);
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
          maxLength={5}
          value={zipcode}
          onChange={handleZipcodeChange}
        />
      </InputGroup>

      <Button
        variant="primary"
        type="submit"
        className="signup-btn "
        onClick={handleLookup}
      >
        Continue
      </Button>

      <p
        className="text-center text-white mt-4 pe-auto"
        onClick={() => navigate("/loading")}
      >
        Skip for now
      </p>
    </div>
  );
};

export default Location;
