import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import "./SplashLoading.css";

const SplashLoading = () => {
  const [completed, setCompleted] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => setCompleted((prev) => prev + 10), 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (completed === 150) {
      const zipcode = location?.state?.zipcode || "90210"; // default to "90210" if no zipcode is available

      fetchData(zipcode);
    }
  }, [completed, location]);

  const fetchData = async (zipcode) => {
    try {
      const response = await axios.get(
        `https://api.zippopotam.us/us/${zipcode}`
      );
      const city = response.data.places[0]["place name"];
      const state = response.data.places[0]["state abbreviation"];

      navigate("/discover", {
        state: { city, state },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <div>
        <img src="/public/assets/splashScreen/FirstImage.png" alt="" />
        <p className="text-white text-center fw-bold">
          Welcome Dreamers, <br /> building your experience
        </p>
      </div>
      <div className="progress-wrapper">
        <ProgressBar now={completed} />
      </div>
    </div>
  );
};

export default SplashLoading;
