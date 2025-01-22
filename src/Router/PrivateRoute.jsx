
import { useContext } from 'react';
import { authContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(authContext);
    const location=useLocation()
   if(loading){
    return <div className='flex justify-center items-center mx-auto mt-6'>
         <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
         
        />
    </div>
   }
    if(user){
        return children
    }
    else{
        return<Navigate to={'/login'} state={{from:location}} replace></Navigate>
    }
};

export default PrivateRoute;