import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateProfile } from 'firebase/auth'; // Import updateProfile from Firebase
import { authContext } from '../Provider/AuthProvider';
import UseAuth from '../Hooks/UseAuth';
import ani from '../assets/Animation - 1736907629598.json';
import Lottie from 'lottie-react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SignUp = () => {
  const navigate = useNavigate();
  const { googleSign } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(authContext);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
       
        updateProfile(loggedUser, {
          displayName: data.name,
          photoURL: data.photoURL,
        })
          .then(() => {
            Swal.fire({
              title: 'Signup Successful!',
              text: 'Welcome to Bistro Boss!',
              icon: 'success',
              draggable: true,
            });
            navigate('/'); 
          })
          .catch((error) => {
            console.error('Profile Update Error:', error);
            Swal.fire({
              title: 'Profile Update Failed!',
              text: error.message,
              icon: 'error',
              draggable: true,
            });
          });
      })
      .catch((error) => {
        console.error('Signup Error:', error);
        Swal.fire({
          title: 'Signup Failed!',
          text: error.message,
          icon: 'error',
          draggable: true,
        });
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          title: 'Signup Successful with Google!',
          icon: 'success',
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Signup Failed with Google!',
          text: error.message,
          icon: 'error',
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
      
        <div className="md:w-1/2 flex justify-center items-center p-6">
          <Lottie animationData={ani}></Lottie>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                {...register('name', { required: true })}
                name="name"
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full mt-2"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...register('email', { required: true })}
                name="email"
                type="email"
                id="email"
                placeholder="Type your email"
                className="input input-bordered w-full mt-2"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register('password', {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full mt-2"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                {...register('photoURL', { required: true })}
                name="photoURL"
                type="text"
                id="photoURL"
                placeholder="Enter a photo URL"
                className="input input-bordered w-full mt-2"
              />
              {errors.photoURL && (
                <span className="text-red-500">Photo URL is required</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login Here
              </Link>
            </p>
            <p className="mt-4">Or sign up with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button
                onClick={handleGoogle}
                className="btn btn-primary w-full rounded-full bg-transparent btn-outline"
              >
                <span className="icon flex justify-evenly gap-3">
                  <FaGoogle /> Google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
