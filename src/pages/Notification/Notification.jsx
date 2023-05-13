import { useState, useEffect, useRef, useLayoutEffect } from "react";
import MobileNotification from "./MobileNotification";
import DesktopNotification from "./DesktopNotification";

function Notification() {
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
      {isMobile ? <MobileNotification /> : <DesktopNotification />}
    </div>
  );
}

export default Notification;
