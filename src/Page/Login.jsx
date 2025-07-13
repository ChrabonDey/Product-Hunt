import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import animation from '../assets/Animation.json';
import Lottie from 'lottie-react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Login = () => {
  const { googleSign, signIn } = UseAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire("Success", "You are logged in!", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Login Failed", error.message, "error");
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then(() => {
        Swal.fire("Success", "You are logged in!", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Login Failed", error.message, "error");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Left Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <Lottie animationData={animation} className="w-full max-w-md" />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="********"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-300">
              New here?{" "}
              <Link to="/signup" className="text-yellow-400 hover:underline">
                Create a New Account
              </Link>
            </p>

            <div className="mt-6">
              <p className="text-sm mb-2">Or sign in with</p>
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
              >
                <FaGoogle className="text-lg" />
                <span className="text-sm font-medium">Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
