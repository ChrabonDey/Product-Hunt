import React, { useState } from "react";
import {
  FaRobot,
  FaUserCog,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const faqItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FaqSection = ({ icon, title, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      variants={faqContainer}
      initial="hidden"
      animate="show"
      className="w-full md:w-1/3 p-4"
    >
      <motion.h3
        variants={faqItem}
        className="text-xl font-bold flex items-center gap-2 text-green-400 mb-4"
      >
        {icon}
        {title}
      </motion.h3>

      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          variants={faqItem}
          className="mb-3 rounded-md bg-gray-800 border border-gray-700"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center text-left px-4 py-3 text-blue-400 font-medium hover:bg-gray-700 transition-all duration-300"
          >
            {faq.question}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-4 text-sm text-white"
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

const FaqPage = () => {
  const generalFaqs = [
    {
      question: "What is Setu Product Hunt?",
      answer:
        "Setu is a curated platform to discover and share the best AI and tech-based products. Users can post, explore, and vote on trending innovations.",
    },
    {
      question: "Who can submit a product?",
      answer:
        "Anyone with an account can submit a product as long as it’s AI or tech-related and aligns with our community guidelines.",
    },
    {
      question: "Is it free to post products?",
      answer:
        "Yes! Posting a product is free. We also offer premium subscriptions for additional visibility and analytics.",
    },
  ];

  const accountFaqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign Up' button at the top-right and register with your email or Google account.",
    },
    {
      question: "Can I edit or delete my posted product?",
      answer:
        "Yes, you can manage your submitted products from your dashboard under 'My Products'.",
    },
    {
      question: "How do I become a verified poster?",
      answer:
        "Engage actively, post quality products, and request verification via your account settings.",
    },
  ];

  const securityFaqs = [
    {
      question: "How is my data protected?",
      answer:
        "We use industry-standard encryption and secure authentication to protect your data.",
    },
    {
      question: "Can I report a fake or malicious product?",
      answer:
        "Absolutely. Click the 'Report' button on the product page and our team will review it immediately.",
    },
    {
      question: "Do you share my information?",
      answer:
        "No, we never sell or share user data with third parties. Your privacy is our priority.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-8">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Frequently Asked <span className="text-green-400">Questions</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-400 mb-10"
      >
        Have questions about posting, voting, or using Setu? Check our most asked questions here.
      </motion.p>

      <div className="flex flex-col md:flex-row gap-6">
        <FaqSection icon={<FaRobot />} title="General Questions" faqs={generalFaqs} />
        <FaqSection icon={<FaUserCog />} title="Manage Account" faqs={accountFaqs} />
        <FaqSection icon={<FaShieldAlt />} title="Privacy & Security" faqs={securityFaqs} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-gray-300 mb-4">
          Still can't find what you're looking for?
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:support@setu.ai"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition"
          >
            Email Us
          </a>
          <a
            href="https://twitter.com/intent/tweet?text=Hello%20Setu%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 rounded-full text-white transition"
          >
            Tweet Us
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FaqPage;
