import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { user } = UseAuth();
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(120); 
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // Fetching user discount and calculating total price
  useEffect(() => {
    const fetchUserDiscount = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.email}/discount`);
        console.log(res.data);
        console.log(`/users/${user?.email}/discount`);

        if (res.data?.discount) {
          const userDiscount = res.data.discount;
          setDiscount(userDiscount);
          setTotalPrice(120 - (120 * userDiscount) / 100); // Calculate total price after discount
        } else {
          setDiscount(0); // No discount if not found
          setTotalPrice(120); // Use base price if no discount
        }
      } catch (err) {
        console.error("Error fetching discount:", err);
        setError("Failed to fetch discount. Please try again.");
      }
    };

    if (user?.email) {
      fetchUserDiscount();
    }
  }, [axiosSecure, user?.email]);

  // Fetching client secret for payment
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await axiosSecure.post("/create-payment-intent", { price: totalPrice });
        if (res.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          throw new Error("Client secret not found in response.");
        }
      } catch (err) {
        console.error("Error fetching client secret:", err);
        setError("Failed to initialize payment. Please try again.");
      }
    };
    fetchClientSecret();
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setError("Payment initialization failed. Please refresh the page and try again.");
      return;
    }

    setProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      });

      if (paymentError) {
        setError(paymentError.message);
        setProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date().toISOString(),
        status: "subscribed",
      };

      const response = await axiosSecure.post("/subscriptions", payment);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Transaction ID: ${paymentIntent.id}`,
        });
        navigate("/dashboard/profile");
      } else {
        throw new Error("Failed to save subscription details.");
      }

      setError("");
    } catch (err) {
      console.error("Error processing payment:", err);
      setError(err.message || "An error occurred during the payment process.");
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: err.message || "Please try again or contact support.",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-primary mb-4">
        Subscribe for {totalPrice.toFixed(2)}
      </h2>
      <p className="text-center text-lg text-gray-600 mb-6">
        Unlock exclusive features by subscribing to our premium plan. Pay securely through Stripe.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg transition duration-200 ${
              processing || !stripe || !clientSecret
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={processing || !stripe || !clientSecret}
          >
            {processing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </div>

        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      </form>
    </section>
  );
};

export default CheckoutForm;
