import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
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
import { IconContext } from "react-icons";

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
    element: <Location />,
  },
  {
    path: "/loading",
    element: <SplashLoading />,
  },
  {
    path: "/discover",
    element: <Home />,
  },
  {
    path: "/discover/recommended",
    element: <RecommendedPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IconContext.Provider value={{ size: 24 }}>
      <RouterProvider router={router} />
    </IconContext.Provider>
  </React.StrictMode>
);
