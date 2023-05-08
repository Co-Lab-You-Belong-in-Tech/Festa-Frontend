import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import navItems from "./navItems";
import "./Footer.css";

export default function Footer({ renderNav }) {
  return (
    <>
      {renderNav && (
        <div className="position-fixed w-100 bottom-0  w-full d-block d-md-none nav-wrapper">
          <div className="w-full px-3 py-2 md:hidden drop-shadow-3xl">
            <MobileNavbar />
          </div>
        </div>
      )}
    </>
  );
}

Footer.propTypes = {
  renderNav: PropTypes.bool.isRequired,
};

function MobileNavbar() {
  const location = useLocation();

  return (
    <nav className="flex flex-row gap-[16px] items-center">
      <ul className="d-flex list-unstyled items-center justify-content-between flex-grow gap-5 px-4 sm:px-12">
        {navItems.map((menu) => (
          <li key={menu.url}>
            <Link
              href={menu.url}
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
