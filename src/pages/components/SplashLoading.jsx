import { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./SplashLoading.css";

const SplashLoading = () => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);

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
