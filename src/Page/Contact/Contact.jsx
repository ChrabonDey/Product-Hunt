import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import img from "../../assets/neon-3d-cybermonday-celebration-template.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:chrabondey@gmail.com?subject=Contact Form Submission&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;

    Swal.fire({
      title: 'Success!',
      text: 'Your message has been sent successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
      background: '#1a1a1a',
      color: '#fff',
      confirmButtonColor: '#facc15'
    });
  };

  return (
    <div className="mt-12 bg-black text-white px-6 md:px-16 py-20 rounded-lg shadow-2xl">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Contact <span className="text-yellow-400">Us</span>
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full rounded-2xl overflow-hidden"
        >
          <img
            src={img}
            alt="Contact Us Visual"
            className="w-full h-full object-cover rounded-2xl brightness-90"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-start justify-start">
            <h1 className="text-yellow-400 text-3xl font-extrabold p-6">Let’s Talk</h1>
          </div>
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-2xl p-10 rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        >
          <h3 className="text-yellow-400 text-3xl font-bold mb-8">Send Us A Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            {['name', 'email', 'phone'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                className="w-full h-12 bg-white/5 backdrop-blur placeholder-white/70 text-white px-4 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-100/10"
              />
            ))}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full h-28 bg-white/5 backdrop-blur placeholder-white/70 text-white px-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-md hover:shadow-yellow-100/10"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-semibold rounded-full shadow-yellow-300/40 shadow-md hover:brightness-110 transition-all"
            >
              Send
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
