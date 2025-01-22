import React, { useState, useEffect } from "react";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const MyProfile = () => {
  const { user, loading } = UseAuth(); // Auth context for user info and loading state
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();

  // Fetch subscription status
  useEffect(() => {
    if (user?.email) {
      const fetchSubscriptionStatus = async () => {
        try {
          const response = await axiosPublic.get(`/subscriptions/${user.email}`);
          setSubscribed(response.data?.subscribed || false);
        } catch (error) {
          console.error("Error fetching subscription status:", error);
        }
      };

      fetchSubscriptionStatus();
    }
  }, [user?.email]);

  // Handle subscription action
  const handleSubscribe = async () => {
    if (!user?.email) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    setSubscribing(true); // Disable the Subscribe button during the process

    try {
      // Redirect to payment page
      navigate("/dashboard/payment", {
        state: { email: user.email, name: user.displayName },
      });
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscribing(false);
    }
  };

  // Handle unsubscription action
  const handleUnsubscribe = async () => {
    if (!user?.email) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    try {
      const response = await axiosPublic.post("/unsubscribe", {
        email: user.email,
      });

      if (response.status === 200) {
        setSubscribed(false);
        alert("Unsubscribed successfully!");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      {user ? (
        <div className="card bg-white shadow-lg rounded-lg p-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center mt-4">
            {user.displayName}
          </h3>
          <p className="text-center text-gray-600">{user.email}</p>

          <div className="mt-6 text-center">
            {subscribed ? (
              <button className="btn btn-secondary" onClick={handleUnsubscribe}>
                Unsubscribe
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubscribe}
                disabled={subscribing || subscribed} // Disable button if already subscribed
              >
                {subscribing ? "Processing..." : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>You need to log in to view your profile.</p>
      )}
    </section>
  );
};

export default MyProfile;
