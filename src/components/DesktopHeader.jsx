import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import navItems from "./navItems";
import { Button } from "react-bootstrap";
import "./DesktopHeader.css";

export default function DesktopHeader({ renderSide }) {
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  return (
    <header className="d-md-flex justify-content-between d-none header ">
      <img src="/assets/Logo_PNG.svg" alt="Logo" />
      {renderSide &&
        (isLoggedIn ? (
          <div className="">
            <DesktopNavbar />
          </div>
        ) : (
          <AuthCTA />
        ))}
    </header>
  );
}

function AuthCTA() {
  const { pathname } = useLocation();
  const isOnRegister = pathname.includes("register");
  return (
    <nav className="d-flex">
      {isOnRegister ? (
        <Link to="/login">
          <Button className="auth-button">Log In</Button>
        </Link>
      ) : (
        <Link to="/register">
          <Button type="" className="text-white auth-button">
            Sign Up
          </Button>
        </Link>
      )}
    </nav>
  );
}

DesktopHeader.propTypes = {
  renderSide: PropTypes.bool.isRequired,
};

function DesktopNavbar() {
  const location = useLocation();

  return (
    <nav className="">
      <ul className="d-flex list-unstyled items-center justify-content-between flex-grow gap-5 px-4 sm:px-12">
        {navItems.map((menu) => (
          <li key={menu.url}>
            <Link
              to={menu.url}
              className="menu-items d-flex flex-column align-items-center gap-1"
            >
              <img
                src={
                  checkUrlMatch(menu.activeUrls, location.pathname)
                    ? menu.active
                    : menu.inactive
                }
                alt="menu-items"
                className="col mb-1"
              />
              <p
                className="menu-name col"
                style={{
                  color: checkUrlMatch(menu.activeUrls, location.pathname)
                    ? "#db27df"
                    : "#B2B4B8",
                }}
              >
                {menu.name}{" "}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function checkUrlMatch(array, pathname) {
  return array.includes(pathname);
}
