import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";



const HomeLayout = () => {
    const [isSticky,setSticky]=useState(false);
    const location=useLocation();
    const noHeaderFooter=location.pathname.includes('login');
    const noHeadersFooters=location.pathname.includes('signup')

    useEffect(()=>{
        const handleScroll=()=>{
            setSticky(window.scrollY>0)
        };
        window.addEventListener('scroll',handleScroll)
        return ()=>{
            window.removeEventListener('scroll',handleScroll);

        }
    },[]);
    return (
        <div>
             <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isSticky ? "bg-[#dbefff] shadow-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-10 py-4 w-full">
        { noHeaderFooter || noHeadersFooters ||   <Navbar />}
        </div>
      </header>
              
            <Outlet></Outlet>
            <section className="">
        {noHeaderFooter || noHeadersFooters || <Footer />}
      </section>

        </div>
    );
};

export default HomeLayout;