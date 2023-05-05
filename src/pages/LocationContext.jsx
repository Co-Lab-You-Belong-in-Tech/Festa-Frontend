import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    city: "",
    state: "",
    zipcode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const savedLocation = JSON.parse(localStorage.getItem("location"));
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const updateLocation = (city, state, zipcode) => {
    const newLocation = { city, state, zipcode };
    setLocation(newLocation);
    localStorage.setItem("location", JSON.stringify(newLocation));
  };

  return (
    <LocationContext.Provider
      value={{ location, updateLocation, isLoading, setIsLoading }}
    >
      {children}
    </LocationContext.Provider>
  );
};
