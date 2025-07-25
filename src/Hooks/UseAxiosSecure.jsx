import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';

export const axiosSecure =axios.create({
    baseURL:'https://product-hunt-server.onrender.com'
})
const UseAxiosSecure = () => {
    const navigate=useNavigate();
    const{logOut}=UseAuth();
   
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access-token')
        config.headers.authorization=`Bearer ${token}`;
        return config;
    },function(error){
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
    
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default UseAxiosSecure;