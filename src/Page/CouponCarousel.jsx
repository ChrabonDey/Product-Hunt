import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image3 from "../assets/sell-bofer.jpg";
import image4 from "../assets/diamond-lattice.webp";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const CouponCarousel = () => {
  const [coupons, setCoupons] = useState([]);
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user } = UseAuth();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosPublic.get("/coupons");
        if (response.data) {
          const validCoupons = response.data.filter(
            (coupon) => new Date(coupon.expiryDate) > new Date()
          );
          setCoupons(validCoupons);
        }
      } catch (error) {
        console.error("Failed to load coupons:", error);
      }
    };

    fetchCoupons();
  }, [axiosPublic]);

  const applyCoupon = async (discount) => {
    try {
      const response = await axiosSecure.patch(`/users/${user.email}/discount`, { discount: discount });
      if (response.status === 200) {
        Swal.fire('Success', 'Discount has been applied!', 'success');
      } else {
        Swal.fire('Error', 'Failed to apply discount.', 'error');
      }
      navigate("/dashboard/payment"); 
    } catch (error) {
      Swal.fire('Error', 'Failed to apply discount.', 'error');
    }
  };

  return (
    <div
      className="my-6 bg-black px-4 md:px-20 py-10 rounded-lg shadow-2xl h-[60vh] md:h-[70vh] text-white"
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
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <SwiperSlide key={coupon.id}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full h-full p-6">
                <div className="flex-1 text-start">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-lg font-semibold bg-yellow-500 text-black px-4 py-2 rounded-full shadow-md">
                      Expiry: {coupon.expiryDate.split("T")[0]}
                    </span>
                    <span className="text-lg font-semibold bg-yellow-400 text-black px-4 py-2 rounded-full shadow-md">
                      Code: {coupon.code}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
                    {coupon.discount}% OFF
                  </h2>
                  <p className="text-lg opacity-90 mb-4 text-white/80">
                    {coupon.description}
                  </p>
                  <button
                    onClick={() => applyCoupon(coupon.discount)}
                    className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black px-6 py-2 rounded-lg shadow-yellow-400/40 shadow-md hover:brightness-110 transition-all font-semibold"
                  >
                    Redeem Now
                  </button>
                </div>
                <motion.div
                  className="flex-1 flex justify-center items-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.95, 1, 0.95] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <img
                    src={image3}
                    alt="Coupon Visual"
                    className="rounded-full w-80 h-80 object-cover shadow-[0_0_60px_rgba(255,255,0,0.5)]"
                  />
                </motion.div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-yellow-400">No coupons available.</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default CouponCarousel;