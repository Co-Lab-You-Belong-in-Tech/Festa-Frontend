import React, { useState } from "react";

export const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const updateLocation = (city, state, zipcode) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      city,
      state,
      zipcode,
    }));
  };

  return (
    <LocationContext.Provider
      value={{ location, updateLocation, isLoading, setIsLoading }}
    >
      {children}
    </LocationContext.Provider>
  );
};
