const navItems = [
  {
    name: "Discover",
    inactive: "/assets/navIcons/home (1) 1.svg",
    active: "/assets/navIcons/home (3) 1.svg",
    url: "/discover",
    activeUrls: ["/discover", "/discover/recommended"],
  },
  {
    name: "Alerts",
    inactive: "/public/assets/navIcons/bell (1) 1.svg",
    active: "/public/assets/navIcons/bell (2) 1.svg",
    url: "/notification",
    activeUrls: ["/notification"],
  },
  {
    name: "Profile",
    inactive: "/public/assets/navIcons/Iconset/user-1.svg",
    active: "/public/assets/navIcons/Iconset/user-2.svg",
    url: "/profile",
    activeUrls: ["/profile"],
  },
];

export default navItems;
