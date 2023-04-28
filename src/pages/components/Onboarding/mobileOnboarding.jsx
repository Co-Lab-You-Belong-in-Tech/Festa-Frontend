import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Button } from "react-bootstrap";
import "./MobileOnboarding.css";

export default function MobileOnboarding() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="carousel"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/splashScreen/FirstImage.png"
            alt="First slide"
          />

          <p className="fw-bold carousel-text button-wrapper">
            Find your next EDM experience. Spend less time searching and more
            time enjoying.
          </p>

          <CallToAction />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/splashScreen/SecondImage.png"
            alt="Second slide"
          />

          <p className="fw-bold carousel-text button-wrapper">
            Follow you favorite EDM artists to get updates on events and
            tickets!
          </p>

          <CallToAction />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/assets/splashScreen/ThirdImage.png"
            alt="Third slide"
          />

          <p className="fw-bold carousel-text button-wrapper">
            EDM music festival and concerts near you when you least expect it.
          </p>
          <CallToAction />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

function CallToAction() {
  const navigate = useNavigate();
  return (
    <div className="button-wrapper mt-4">
      <Button className="sign-up" onClick={() => navigate("/register")}>
        Get Started
      </Button>
      <Button className="sign-in" onClick={() => navigate("/login")}>
        I already have an account
      </Button>
    </div>
  );
}
