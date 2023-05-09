import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store/store.js";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Root from "./pages/index.jsx";
import ErrorPage from "./error-page";
import Register from "./pages/Accounts/SignUp";
import Login from "./pages/Accounts/SignIn";
import ChooseArtist from "./pages/ChooseArtist";
import Location from "./pages/Location";
import SplashLoading from "./components/SplashLoading";
import Home from "./pages/Home";
import RecommendedPage from "./pages/Recommended";
import UpcomingEvents from "./pages/UpcomingEvents";
import EventDetails from "./pages/EventPage/EventDetails.jsx";
import Notification from "./pages/Notification.jsx";
import Profile from "./pages/Profile/Profile.jsx";

import { IconContext } from "react-icons";
import { LocationProvider } from "./pages/LocationContext.jsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/choose-artist",
    element: <ChooseArtist />,
  },
  {
    path: "/location",
    element: (
      <LocationProvider>
        <Location />
      </LocationProvider>
    ),
  },
  {
    path: "/loading",
    element: (
      <LocationProvider>
        <SplashLoading />
      </LocationProvider>
    ),
  },
  {
    path: "/discover",
    element: (
      <LocationProvider>
        <Home />
      </LocationProvider>
    ),
  },
  {
    path: "/discover/recommended",
    element: <RecommendedPage />,
  },
  {
    path: "/discover/upcoming-events",
    element: <UpcomingEvents />,
  },
  {
    path: "/event/:id",
    element: <EventDetails />,
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <IconContext.Provider value={{ size: 24 }}>
          <RouterProvider router={router} />
          <ToastContainer />
        </IconContext.Provider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
