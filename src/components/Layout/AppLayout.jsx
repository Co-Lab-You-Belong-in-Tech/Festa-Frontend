import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import DesktopHeader from "../DesktopHeader";
import Footer from "../Footer";

function AppLayout({ children, renderSide = false, renderNav = false }) {
  const { isLoggedIn, register_success } = useSelector(
    (state) => state.account
  );
  const navigate = useNavigate();
  const location = useLocation();
  const protectedRoutes = [
    "/loading",
    "/choose-artist",
    "/discover",
    "/discover/recommended",
    // '/memory/[id]',
    // '/discover/[memoryId]',
    // '/memory/new',
  ];

  useEffect(() => {
    if (!isLoggedIn && protectedRoutes.includes(location.pathname)) {
      console.log(isLoggedIn);
      toast.warning("You need to be logged in to access this page");
      navigate("/login");
    } else if (
      isLoggedIn &&
      (location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/")
    ) {
      navigate("/discover");
    }
  }, [
    isLoggedIn,
    register_success,
    navigate,
    location.pathname,
    protectedRoutes,
  ]);

  return (
    <div className="app-layout d-flex flex-column">
      <DesktopHeader renderSide={renderSide} />
      <div className="flex-grow-1 d-grid">{children}</div>
      {/* {isLoggedIn ? children : null} */}
      <Footer renderNav={renderNav} />
    </div>
  );
}

AppLayout.defaultProps = {
  renderSide: true,
  renderNav: true,
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  renderSide: PropTypes.bool,
  renderNav: PropTypes.bool,
};

export default AppLayout;
