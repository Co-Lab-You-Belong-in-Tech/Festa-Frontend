import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import navItems from "./navItems";

export default function DesktopHeader({ renderSide }) {
  const isLoggedIn = useSelector((state) => state.account.isLoggedIn);

  return (
    <header className="d-md-block d-none">
      <img src="/assets/Logo_PNG.svg" alt="Logo" />
      {renderSide &&
        (isLoggedIn ? (
          <div className="">
            <DesktopNavbar />
          </div>
        ) : (
          <nav className="">
            <Link to="/register">
              <p className="text-2xl font-bold cursor-pointer">Sign Up</p>
            </Link>
            <Link to="/login">
              <p className="text-2xl font-bold cursor-pointer">Log In</p>
            </Link>
          </nav>
        ))}
    </header>
  );
}

DesktopHeader.propTypes = {
  renderSide: PropTypes.bool.isRequired,
};

function DesktopNavbar() {
  const location = useLocation();
  return (
    <nav className="flex items-center mr-6">
      <ul className="flex items-end gap-6 ml-auto list-none">
        {navItems.map((menu) => (
          <li
            className={`list-none relative h-5 flex items-center cursor-pointer border-0 menu-items ${
              menu.url === "/discover" && "order-first"
            }`}
            key={menu.url}
          >
            <Link href={menu.url}>
              <img
                src={
                  checkUrlMatch(menu.activeUrls, location.pathname)
                    ? menu.active
                    : menu.inactive
                }
                alt={menu.url}
                className="object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function checkUrlMatch(array, pathname) {
  for (let i = 0; i < array.length; i += 1) {
    if (pathname.indexOf(array[i]) !== -1) {
      return true;
    }
  }
  return false;
}
