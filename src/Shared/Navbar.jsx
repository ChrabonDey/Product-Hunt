import React, { useState } from "react";
import img1 from "../assets/Dark Blue & White Initial P Logo (1).png";
import { NavLink } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-4 py-3 shadow-md bg-black text-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section: Logo + Links */}
        <div className="flex items-center gap-10 justify-start">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={img1}
              alt="Logo"
              className="w-10 h-10 shadow-md border-2 rounded-xl"
            />
            <div className="text-xl lg:text-xl hidden md:flex font-bold">
              <span>roduct</span>{" "}
              <span className="text-yellow-200">Hunt</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-6 text-[14px] font-semibold">
            <NavLink className="hover:text-yellow-200" to="/">Home</NavLink>
            <NavLink className="hover:text-yellow-200" to="/about">About</NavLink>
            <NavLink className="hover:text-yellow-200" to="/Products">Products</NavLink>
            <NavLink className="hover:text-yellow-200" to="/contact">Contact</NavLink>
            {user && (
              <NavLink className="hover:text-yellow-200 border-1 shadow-yellow-200 shadow-inner bg-white/10 rounded-full px-3 " to="/dashboard">Dashboard</NavLink>
            )}
          </div>
        </div>

        {/* Right Section: Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user && (
            <NavLink to="/image">
              <button className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-semibold px-5 py-2 rounded-full animate-pulse shadow-lg hover:scale-105 transition duration-300">
              AI Generate Image
              </button>
            </NavLink>
          )}

          {!user ? (
            <NavLink to="/login">
              <button className="py-2 px-6 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#006dc7] transition font-semibold">
                Sign up / Log in
              </button>
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end ml-3">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-offset-2 ring-offset-[#ffde49]">
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    title={user.displayName || "User"}
                  />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-white text-black rounded-box w-52 shadow">
                <li>
                  <span>{user.displayName || user.email}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn bg-[#bea31d] text-white">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] p-4 rounded shadow-md space-y-3 text-[16px] font-semibold text-white">
          <NavLink className="block hover:text-[#4978ff]" to="/">Home</NavLink>
          <NavLink className="block hover:text-[#4978ff]" to="/about">About</NavLink>
          <NavLink className="block hover:text-[#4978ff]" to="/Products">Products</NavLink>
          <NavLink className="block hover:text-[#4978ff]" to="/contact">Contact</NavLink>
          {user && (
            <>
              <NavLink className="block hover:text-[#4978ff]" to="/dashboard">Dashboard</NavLink>
              <NavLink to="/image">
                <button className="w-full mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-semibold py-2 rounded-full animate-pulse shadow-md hover:scale-105 transition duration-300">
                 AI Generate Image
                </button>
              </NavLink>
            </>
          )}
          {!user ? (
            <NavLink to="/login">
              <button className="w-full mt-2 py-2 px-4 border-2 border-[#4978ff] rounded-full hover:bg-[#4978ff] hover:text-white transition">
                Sign up / Log in
              </button>
            </NavLink>
          ) : (
            <>
              <div className="mt-2">{user.displayName || user.email}</div>
              <button
                onClick={handleLogout}
                className="w-full mt-2 btn bg-[#006dc7] text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
