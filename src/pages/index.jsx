import { useState, useEffect, useRef, useLayoutEffect } from "react";
import MobileOnboardingPage from "../components/Onboarding/mobileOnboarding.jsx";
import DesktopOnboardingPage from "../components/Onboarding/desktopOnboarding.jsx";

function Onboarding() {
  const [isMobile, setIsMobile] = useState(false);
  const [domWidth, setDomWidth] = useState(0);

  const pageRef = useRef(null);

  useEffect(() => {
    if (domWidth < 1000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [domWidth]);

  const handleResize = () => {
    setDomWidth(pageRef.current.offsetWidth);
  };

  useLayoutEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={pageRef}>
      {isMobile ? <MobileOnboardingPage /> : <DesktopOnboardingPage />}
    </div>
  );
}

export default Onboarding;
