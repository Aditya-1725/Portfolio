import { useState } from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

function Navbar() {
  const location =
    useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  // Hide Navbar on Admin Pages

  if (
    location.pathname.startsWith(
      "/admin"
    )
  ) {
    return null;
  }

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Experience",
      path: "/experience",
    },
    {
      name: "Certificates",
      path: "/certification",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <nav
      className="
      fixed
      top-0
      left-0
      w-full
      z-[999]
      bg-[#050505]/80
      backdrop-blur-xl
      border-b
      border-green-500/10
      shadow-[0_5px_20px_rgba(0,0,0,0.25)]
      "
    >
      <div
        className="
        max-w-[1250px]
        mx-auto
        h-20
        px-6
        md:px-10
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
          text-3xl
          md:text-4xl
          font-black
          tracking-wide
          text-green-400
          hover:text-green-300
          hover:drop-shadow-[0_0_12px_rgba(0,255,136,0.6)]
          transition-all
          duration-300
          "
        >
          Aditya
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-8 md:gap-10">
          {navItems.map(
            (item) => (
              <Link
                key={
                  item.name
                }
                to={
                  item.path
                }
                className={`
                relative
                text-[16px]
                font-medium
                tracking-wide
                transition-all
                duration-300
                ${
                  location.pathname ===
                  item.path
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }
              `}
              >
                {item.name}

                <span
                  className={`
                  absolute
                  left-0
                  -bottom-2
                  h-[2px]
                  bg-green-400
                  transition-all
                  duration-300
                  ${
                    location.pathname ===
                    item.path
                      ? "w-full"
                      : "w-0"
                  }
                `}
                />
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="
            md:hidden
            text-green-400
            text-3xl
            font-bold
            transition-all
            duration-300
            hover:text-green-300
          "
        >
          {menuOpen
            ? "✕"
            : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}

      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          bg-[#0d0d0d]/95
          backdrop-blur-xl
          border-t
          border-green-500/10
          ${
            menuOpen
              ? "max-h-96 py-4"
              : "max-h-0"
          }
        `}
      >
        <div className="flex flex-col px-6">
          {navItems.map(
            (item) => (
              <Link
                key={
                  item.name
                }
                to={
                  item.path
                }
                onClick={
                  closeMenu
                }
                className={`
                  py-4
                  text-lg
                  border-b
                  border-green-500/5
                  transition-all
                  duration-300
                  ${
                    location.pathname ===
                    item.path
                      ? "text-green-400"
                      : "text-gray-300 hover:text-green-400 hover:pl-2"
                  }
                `}
              >
                {
                  item.name
                }
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;