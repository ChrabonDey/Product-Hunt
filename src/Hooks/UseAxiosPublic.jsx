import axios from "axios";

export const axiosPublic=axios.create({
    baseURL:'https://product-hunt-server.onrender.com'
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;