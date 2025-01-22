import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import image1 from "../assets/Web-dev.png";
import image2 from "../assets/Game.png";
import image3 from "../assets/2150586589.jpg";
import image5 from "../assets/Robot-1.jpg";
import image4 from "../assets/diamond-lattice.webp";

const Banner = () => {
  return (
    <div
      className="my-6 bg-[#dbefff] px-4 md:px-20 rounded-lg shadow-lg h-[60vh] md:h-[70vh]"
      style={{ backgroundImage: `url("${image4}")` }}
    >
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        
        <SwiperSlide>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full h-full p-6">
            <div className="flex-1 text-start text-black">
              <div className="flex items-center">
                <span className="text-xl font-semibold border-2 rounded-full border-white px-4">
                  Discover AI Tools
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 w-full md:w-3/4">
                Boost Productivity <br /> with AI-Powered Solutions
              </h2>
              <p className="text-lg opacity-70 w-full md:w-3/4 mb-4">
                Explore cutting-edge AI tools that simplify tasks and enhance
                efficiency in your daily workflow.
              </p>
            </div>
            <div className="flex-1 relative">
              <img src={image3} alt="AI Tools" className="" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full h-full p-6">
            <div className="flex-1 text-start text-black">
              <div className="flex items-center">
                <span className="text-xl font-semibold border-2 rounded-full border-white px-4">
                  Explore Web Tools
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 w-full md:w-3/4">
                Simplify Web Development <br /> with Advanced Tools
              </h2>
              <p className="text-lg opacity-70 w-full md:w-3/4 mb-4">
                Access powerful web tools to create, manage, and optimize your
                projects effortlessly.
              </p>
            </div>
            <div className="flex-1 relative">
              <img src={image1} alt="Web Tools" className="" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full h-full p-6">
            <div className="flex-1 text-start text-black">
              <div className="flex items-center">
                <span className="text-xl font-semibold border-2 rounded-full border-white px-4">
                  Dive Into Gaming
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 w-full md:w-3/4">
                Unleash Fun <br /> with Trending Games
              </h2>
              <p className="text-lg opacity-70 w-full md:w-3/4 mb-4">
                Discover the latest and most exciting games to ignite your
                passion for gaming.
              </p>
            </div>
            <div className="flex-1 relative">
              <img src={image2} alt="Gaming Products" className="" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full h-full p-6">
            <div className="flex-1 text-start text-black">
              <div className="flex items-center">
                <span className="text-xl font-semibold border-2 rounded-full border-white px-4">
                  Discover Software
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 w-full md:w-3/4">
                Enhance Performance <br /> with Top Software Solutions
              </h2>
              <p className="text-lg opacity-70 w-full md:w-3/4 mb-4">
                Find reliable software for business, creativity, and everyday
                tasks to maximize your potential.
              </p>
            </div>
            <div className="flex-1 relative">
              <img src={image5} alt="Software Solutions" className="  rounded-full w-96 h-96 " />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
