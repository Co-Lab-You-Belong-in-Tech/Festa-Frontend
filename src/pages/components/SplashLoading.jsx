import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import "./SplashLoading.css";

const SplashLoading = () => {
  const [completed, setCompleted] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => setCompleted((prev) => prev + 10), 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (completed == 150) {
      navigate("/choose-artist");
    }
  }, [completed]);

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
