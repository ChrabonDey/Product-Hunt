import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import BackgroundAnimation from "../BackgroundAnimation";

const HomeLayout = () => {
  const [isSticky, setSticky] = useState(" ");
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const noHeaderFooter = location.pathname.includes("login");
  const noHeadersFooters = location.pathname.includes("signup");

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const FancyLoader = () => (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="backdrop-blur-lg bg-white/10 p-10 rounded-3xl border border-white/20 shadow-lg flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-10 w-10 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <p className="text-white font-semibold tracking-wide">
          Loading... Please wait
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen">
      <BackgroundAnimation />
      {isLoading && <FancyLoader />}
      <div className="relative">
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            isSticky ? "bg-[#dbefff] shadow-md" : "bg-transparent"
          }`}
        >
          <div className="mx-auto rounded-full">
            {noHeaderFooter || noHeadersFooters || <Navbar />}
          </div>
        </header>

        <Outlet />

        <section>{noHeaderFooter || noHeadersFooters || <Footer />}</section>
      </div>
    </div>
  );
};

export default HomeLayout;
