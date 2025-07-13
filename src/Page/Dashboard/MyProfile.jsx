import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const MyProfile = () => {
  const { user, loading } = UseAuth();
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();

  useEffect(() => {
    if (user?.email) {
      const fetchSubscriptionStatus = async () => {
        try {
          const res = await axiosPublic.get(`/subscriptions/${user.email}`);
          setSubscribed(res.data?.subscribed || false);
        } catch (err) {
          console.error("Subscription check failed", err);
        }
      };
      fetchSubscriptionStatus();
    }
  }, [user?.email]);

  const handleSubscribe = () => {
    if (!user?.email) return navigate("/login");
    setSubscribing(true);
    navigate("/dashboard/payment", {
      state: { email: user.email, name: user.displayName },
    });
  };

  const handleUnsubscribe = async () => {
    try {
      const res = await axiosPublic.post("/unsubscribe", { email: user.email });
      if (res.status === 200) {
        setSubscribed(false);
        alert("Unsubscribed successfully!");
      }
    } catch (err) {
      console.error("Unsubscribe failed", err);
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-black via-[#0f1c2e] to-black p-8 text-white flex flex-col items-center justify-center rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl px-10 py-10 w-full max-w-md text-center"
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#00d9ff]">{user?.displayName}</h2>
        <p className="text-gray-300 flex items-center justify-center gap-2 mt-2">
          <FaEnvelope className="text-blue-400" />
          {user?.email}
        </p>

        <div className="mt-6">
          {subscribed ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnsubscribe}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 transition font-semibold rounded-full flex items-center gap-2 justify-center w-full"
            >
              <FaTimesCircle /> Unsubscribe
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubscribe}
              disabled={subscribing}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition font-semibold rounded-full flex items-center gap-2 justify-center w-full"
            >
              <FaCheckCircle />
              {subscribing ? "Processing..." : "Subscribe"}
            </motion.button>
          )}
        </div>

        <p className="text-sm mt-4 text-gray-400">
          {subscribed ? "You are currently subscribed" : "You are not subscribed"}
        </p>
      </motion.div>
    </motion.section>
  );
};

export default MyProfile;
