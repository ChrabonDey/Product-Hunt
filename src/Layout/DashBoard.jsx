import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseModerator from "../Hooks/UseModerator";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { HiOutlineUserCircle, HiOutlineHome } from "react-icons/hi";
import { BiAddToQueue, BiListUl } from "react-icons/bi";
import { RiTeamLine, RiCoupon2Line } from "react-icons/ri";
import { MdOutlineReportProblem } from "react-icons/md";
import { FiMonitor, FiMenu } from "react-icons/fi";
import { GiMagnifyingGlass } from "react-icons/gi";

import img from "../assets/Dark Blue & White Initial P Logo (1).png";
import { FaQuestionCircle } from "react-icons/fa";

const navLinksData = [
    { label: "My Profile", to: "/dashboard", icon: <HiOutlineUserCircle size={24} />, roles: ["all"] },
   { label: "Statistics Page", to: "/dashboard/Stat", icon: <FiMonitor size={22} />, roles: ["user"] },
  { label: "Add Product", to: "/dashboard/addProduct", icon: <BiAddToQueue size={22} />, roles: ["user"] },
  { label: "My Products", to: "/dashboard/myProducts", icon: <BiListUl size={22} />, roles: ["user"] },
  { label: "FAQ", to: "/dashboard/faq", icon: <FaQuestionCircle size={22} />, roles: ["user"] },
  { label: "Product Review Queue", to: "/dashboard/reviewQueue", icon: <GiMagnifyingGlass size={22} />, roles: ["moderator"] },
  { label: "Reported Contents", to: "/dashboard/reportedContents", icon: <MdOutlineReportProblem size={22} />, roles: ["moderator"] },
  { label: "Statistics Page", to: "/dashboard/statistics", icon: <FiMonitor size={22} />, roles: ["admin"] },
  { label: "Manage Users", to: "/dashboard/manageUsers", icon: <RiTeamLine size={22} />, roles: ["admin"] },
  { label: "Manage Coupons", to: "/dashboard/manageCoupons", icon: <RiCoupon2Line size={22} />, roles: ["admin"] },
  { label: "Home", to: "/", icon: <HiOutlineHome size={22} />, roles: ["all"] },
];

const DashBoard = () => {
  const [isAdmin] = UseAdmin();
  const [isModerator] = UseModerator();
  const [collapsed, setCollapsed] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let role = "user";
  if (isAdmin) role = "admin";
  else if (isModerator) role = "moderator";

  const filteredLinks = navLinksData.filter(
    (link) => link.roles.includes(role) || link.roles.includes("all")
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white select-none">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 70 : 280 }}
        transition={{ type: "spring", stiffness: 210, damping: 25 }}
        className="relative flex flex-col bg-black/30 backdrop-blur-xl border-r border-gray-700 shadow-xl"
      >
        {/* Header with Logo and Toggle */}
        <div
          className={`flex items-center justify-between font-bold tracking-wide uppercase text-white mt-6 mb-10 px-5 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <img
              src={img}
              alt="Logo"
              className="w-10 h-10 border-2 border-white rounded-xl p-1"
            />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl select-none"
              >
                roduct <span className="text-yellow-500">Hunt</span>
              </motion.span>
            )}
          </div>

        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-2 px-2">
            {filteredLinks.map(({ label, to, icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-5 py-3 px-5 rounded-lg transition-colors duration-300
                  ${
                    isActive
                      ? "bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-400/50"
                      : "hover:bg-yellow-400/20 text-white"
                  }`
                }
              >
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      className="select-none whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <footer className="p-4 text-center text-xs text-gray-400 select-none">
            &copy; 2025 Product Hunt. All rights reserved.
          </footer>
        )}
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
