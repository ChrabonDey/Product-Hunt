import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import img1 from "../assets/robo1.jpg";
import img2 from "../assets/person-using-ar-technology-perform-their-occupation.jpg";
import img3 from "../assets/robo2.jpg";
import img4 from "../assets/person-using-ar-technology-perform-their-occupation.jpg";
import img5 from "../assets/neon-3d-cybermonday-celebration-template.jpg";
import img6 from "../assets/anthropomorphic-robot-performing-regular-human-job-future.jpg"

const Banner = () => {
  return (
    <div className="py-12 px-4 md:px-16 my-10 bg-black">
      {/* Title */}
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-12 tracking-wide">
        What would you like <span className="text-yellow-400">to create?</span>
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Swiper Card */}
        <div className="lg:row-span-3 relative rounded-xl overflow-hidden shadow-xl">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500 }}
            loop
            className="w-full h-full"
          >
            {[img1, img2, img3].map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
                  <div className="absolute inset-0 flex items-center justify-start px-6">
                    <div className="backdrop-blur-sm text-left bg-white/10 p-6 rounded-lg text-white max-w-md space-y-2">
                      <h3 className="text-3xl font-bold text-yellow-400">
                        Talent Program
                      </h3>
                      <p className="text-lg leading-snug">
                        Join our elite program and push the boundaries of
                        creativity and technology.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mid 3 Cards */}
        {[
          {
            title: "Best Ai products",
            description:
              "High fidelity AI product you can found here which is a new",
            image: img5,
          },
          {
            title: "Trendy AI",
            description:
              "Produce low-poly meshes with hand-crafted precision at lightning speed",
            image: img3,
          },
          {
            title: "New AI Tools",
            description:
              "Smart texture gen, style transfer, magic texture brush & PBR all in one.",
            image: img6,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="relative h-[250px] bg-cover bg-center rounded-xl overflow-hidden group shadow-lg"
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute inset-0 flex items-end justify-start p-5">
              <div className="text-white space-y-2">
                <h3 className="text-xl font-bold text-yellow-400">
                  {card.title}
                </h3>
                <p className="text-sm opacity-90">{card.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Right Full Height Card */}
        <div
          className="lg:row-span-3 relative h-[250px] bg-cover bg-center rounded-xl overflow-hidden group shadow-lg"
          style={{ backgroundImage: `url(${img1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
          <div className="absolute inset-0 flex items-center justify-start px-6">
            <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg text-white max-w-md space-y-2">
              <h3 className="text-3xl font-bold text-yellow-400">
                Universal Rig & Animation
              </h3>
              <p className="text-lg leading-snug">
                One-click rigging for any model — smart, fast, universal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
