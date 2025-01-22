import {
  FaHome,
  FaUtensils,
  FaList,
  FaShoppingCart,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import { FaCalendar, FaRankingStar, FaWallet } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import UseModerator from "../Hooks/UseModerator";

const DashBoard = () => {
  const [isAdmin] = UseAdmin();
  const [isModerator] = UseModerator();

  return (
    <div className="flex flex-row gap-5">
      <div className="w-64 min-h-screen bg-[#dbefff] text-black">
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold uppercase">Product Hunt</h1>
        </div>
        <ul className="menu px-4 space-y-2">
          {/* User Role Links */}
          {!isAdmin && !isModerator && (
            <>
              
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaUtensils />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addProduct"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaList />
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myProducts"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaBars />
                  My Products
                </NavLink>
              </li>
            </>
          )}

          {/* Moderator Role Links */}
          {isModerator && (
            <>
              <li>
                <NavLink
                  to="/dashboard/reviewQueue"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaList />
                  Product Review Queue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reportedContents"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaList />
                  Reported Contents
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Role Links */}
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/statistics"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaList />
                  Statistics Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaList />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageCoupons"
                  className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
                >
                  <FaList />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <hr className="my-4 border-yellow-800" />
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-2 py-2 px-3 hover:text-[#4978ff] rounded-md"
            >
              <FaHome />
              Home
            </NavLink>
          </li>

        </ul>
      </div>

      <div className="flex-1 p-6 text-black">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
