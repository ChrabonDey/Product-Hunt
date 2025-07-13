import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth';
import { authContext } from '../Provider/AuthProvider';
import UseAuth from '../Hooks/UseAuth';
import ani from '../assets/Animation - 1736907629598.json';
import Lottie from 'lottie-react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();
  const { googleSign } = UseAuth();
  const { createUser } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: data.name,
          photoURL: data.photoURL,
        }).then(() => {
          Swal.fire("Signup Successful!", "Welcome to Prodct Hunt!", "success");
          navigate('/');
        }).catch((err) => {
          Swal.fire("Profile Update Failed", err.message, "error");
        });
      })
      .catch((error) => {
        Swal.fire("Signup Failed!", error.message, "error");
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then(() => {
        Swal.fire("Signup Successful with Google!", "", "success");
        navigate('/');
      })
      .catch((error) => {
        Swal.fire("Google Signup Failed", error.message, "error");
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
        {/* Lottie animation section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <Lottie animationData={ani} className="w-full max-w-md" />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Create an Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                {...register('name', { required: true })}
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register('email', { required: true })}
                placeholder="email@example.com"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                {...register('password', { required: true, minLength: 6, maxLength: 20 })}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be 6-20 characters
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                {...register('photoURL', { required: true })}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.photoURL && <p className="text-red-500 text-sm mt-1">Photo URL is required</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-400 hover:underline">
                Login Here
              </Link>
            </p>

            <div className="mt-6">
              <p className="text-sm mb-2">Or sign up with</p>
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

export default SignUp;
