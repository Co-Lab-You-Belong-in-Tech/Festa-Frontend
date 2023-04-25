import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Root from "./pages/index.jsx";
import ErrorPage from "./error-page";
import Register from "./pages/components/Accounts/SignUp";
import Login from "./pages/components/Accounts/SignIn";
import ChooseArtist from "./pages/components/ChooseArtist";
import Location from "./pages/components/Location";
import SplashLoading from "./pages/components/SplashLoading";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
