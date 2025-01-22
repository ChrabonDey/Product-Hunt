import axios from "axios";

export const axiosPublic=axios.create({
    baseURL:'https://product-hunt-server-amber.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;