import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import "./SplashLoading.css";
import AppLayout from "./Layout/AppLayout";

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
    <AppLayout renderNav={false} renderSide={false}>
      <div className="d-grid d-md-none imgHouse">
        <img src="/public/assets/Logo_PNG.svg" alt="" className="img-logo " />
      </div>
      <div className="wrapper py-5">
        <img
          src="/assets/splashScreen/zachary-smith-zorgErvL_Fs-unsplash 2.png"
          alt=""
          className="position-absolute top-0 bttom-0 left-0 right-0 imgContainer"
        />
        <div className="content">
          <div>
            <div className="">
              <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                  <div className="mobile-image-crop"></div>
                </div>
              </div>

              {/* <div className="">
              <div className="mobile-image-crop w-100 position-relative">
                <img
                  src="/public/assets/splashScreen/zachary-smith-zorgErvL_Fs-unsplash 2.png"
                  alt=""
                  className=" d-block mx-auto w-100"
                />
                <div className="gradient-overlay"></div>
              </div>
            </div> */}
            </div>

            {/* <div className="w-100">
            {" "}
            <img
              src="/public/assets/splashScreen/zachary-smith-zorgErvL_Fs-unsplash 2.png"
              alt=""
              className=""
            />
          </div> */}
            <p className="text-white text-center fw-bold">
              Welcome Dreamers, <br /> building your experience
            </p>
          </div>
          <div className="progress-wrapper d-md-flex justify-content-md-center">
            <div className="col-12 col-md-6">
              <div className="px-3">
                <ProgressBar now={completed} className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SplashLoading;
