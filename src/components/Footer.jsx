import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import navItems from "./navItems";

export default function Footer({ renderNav }) {
  return (
    <>
      {renderNav && (
        <div className="fixed bottom-0 left-0 z-20 w-full">
          <div className="w-full px-5 pt-2 pb-5 bg-white md:hidden drop-shadow-3xl">
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
      <ul className="flex items-center justify-between flex-grow gap-5 px-4 sm:px-12">
        {navItems.map((menu) => (
          <li className="menu-items" key={menu.url}>
            <Link href={menu.url}>
              <img
                src={
                  checkUrlMatch(menu.activeUrls, location.pathname)
                    ? menu.active
                    : menu.inactive
                }
                alt="menu-items"
                className="h-9 w-9"
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
