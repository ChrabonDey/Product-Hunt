import React from 'react';
import grow from '../../assets/Animation - 1739964051314.json';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen text-white px-6 md:px-20 py-12">
            <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8 }}
                className="md:w-1/2 text-center md:text-left rounded-3xl bg-[#dbefff] p-16 shadow-2xl backdrop-blur-lg border border-white/30"
            >
                <div className='relative -top-10 left-10'>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-black ">What Is <span className="text-[#006dc7]">Product Hunt</span></h1>
                </div>
                <p className="text-lg md:text-xl text-black leading-relaxed">
                    Your go-to platform for discovering the most exciting AI innovations. Whether you’re a tech enthusiast, a developer, or a business owner, we provide a seamless way to explore, learn about, and access the latest AI tools featured on Product Hunt.
                </p>
                <p className="mt-4 text-lg md:text-xl text-black leading-relaxed">
                    Artificial Intelligence is transforming industries at an unprecedented pace. From automation and machine learning to AI-powered creativity and analytics, there’s no limit to what AI can achieve. At <span className="text-[#006dc7] font-semibold">Product-Hunt</span>, 
                </p>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1 }}
                className="md:w-1/2 flex justify-center mt-10 md:mt-0"
            >
                <div className="bg-white/10 p-6 rounded-full shadow-xl border border-white/20">
                    <Lottie animationData={grow} loop={true} className="w-full max-w-md md:max-w-lg" />
                </div>
            </motion.div>
        </div>
    );
};

export default About;
