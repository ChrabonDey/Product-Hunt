import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

const Payment = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#0f0f0f] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      >
        <div className="flex flex-col items-center mb-8">
          <FaCreditCard className="text-5xl text-[#00f2ff] drop-shadow-lg mb-3 animate-pulse" />
          <h1 className="text-3xl font-bold text-[#00f2ff] text-center">Stripe Payment</h1>
          <p className="text-gray-400 text-sm text-center">Complete your subscription securely</p>
        </div>

        <Elements stripe={stripePromise}>
          <div className="bg-[#161616] p-6 rounded-xl border border-[#2a2a2a] shadow-inner">
            <CheckoutForm />
          </div>
        </Elements>
      </motion.div>
    </section>
  );
};

export default Payment;
