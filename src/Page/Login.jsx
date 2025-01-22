import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import animation from '../assets/Animation.json';
import Lottie from 'lottie-react';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

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
        const user = result.user;
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`,
          },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster`,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then((res) => {
        const user = res.user;
        Swal.fire({
          title: "Successfully Logged In",
          icon: "success",
          showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`,
          },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster`,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
      
        <div className="md:w-1/2 flex justify-center items-center p-6">
          <Lottie animationData={animation} />
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Type here"
                className="input input-bordered w-full mt-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full mt-2"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            <p>
              New here?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create a New Account
              </Link>
            </p>
            <p className="mt-4">Or sign in with</p>
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

export default Login;
