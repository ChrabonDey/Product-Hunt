import React, { useState } from "react";
import img1 from "../assets/rb_25971.png";
import { NavLink } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const Navbar = () => {
   const {user,logOut}=UseAuth()

   const handleLogout=()=>{
    logOut()
    .then(()=>{})
    .catch(error=>{
        console.log(error);
    })
}

  return (
    <div className="text-center">
      <div className="navbar  px-4 py-2 text-black font-bold">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink to="/" className="hover:text-[#4978ff]">Home</NavLink>
              <NavLink to="/Products" className="hover:text-[#4978ff]">Products</NavLink>
              {user && <NavLink to="/dashboard" className="hover:text-[#4978ff]">DashBoard</NavLink>}
              
            </ul>
          </div>
          <div className="flex items-center gap-3 ">
            <img
              src={img1}
              alt="Logo"
              className="w-10 h-10 p-1 border rounded-full shadow-md"
            />
            <div className="font-bold text-2xl lg:text-3xl hidden md:flex">
              <span>Product</span>{" "}
              <span className="text-[#006dc7]">Hunt</span>
            </div>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex gap-6">
          <NavLink className="hover:text-[#4978ff]" to="/">Home</NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/Products">Products</NavLink>
          
          {user && (
            <>
              <NavLink className="hover:text-[#4978ff]" to="/dashboard">DashBoard</NavLink>
             
            </>
          )}
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login">
                <button className="btn bg-[#006dc7] text-white px-6 font-semibold hover:bg-[#4343e5] hover:scale-105">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="btn bg-[#006dc7] text-white px-6 font-semibold hover:bg-[#4343e5] hover:scale-105">
                  SignUp
                </button>
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    title={user.displayName || "User"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box w-52 shadow"
              >
                <li>
                  <span>{user.displayName || user.email}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-[#006dc7] text-white px-6 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
