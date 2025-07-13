import React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";
import HomeLayout from '../Layout/HomeLayout';
import Home from '../Home/Home';
import Login from '../Page/Login';
import SignUp from '../Page/SignUp';
import ProductPage from '../Page/ProductPage'; // Import ProductPage component
import AllProductsPage from '../Page/AllProductsPage';
import PrivateRoute from './PrivateRoute';
import DashBoard from '../Layout/DashBoard';
import MyProfile from '../Page/Dashboard/MyProfile';
import AddProductPage from '../Page/Dashboard/AddProductPage';
import MyProductsPage from '../Page/Dashboard/MyProductsPage';
import Product from '../Page/Dashboard/Modarator/product';
import ReportedContent from '../Page/Dashboard/Modarator/ReportedContent';
import ManageUsers from '../Page/Dashboard/Admin/MangeUsers';
import AdminStatistics from '../Page/Dashboard/Admin/AdminStatistics';
import Payment from '../Page/Dashboard/Payment';
import UpdateProductPage from '../Page/Dashboard/UpdateProductPage';
import AdminCouponsPage from '../Page/Dashboard/Admin/AdminCuponPage';
import NotFound from '../NotFound';
import About from '../Page/About/About';
import Contact from '../Page/Contact/Contact';
import FaqPage from '../Page/Dashboard/FaqPage';
import MyProductStatistics from '../Page/Dashboard/MyProductStatistics';
import TextToImage from '../Page/TextToImage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // Root layout for the app
    children: [
      {
        path: "/", // Homepage path
        element: <Home />,
      },
      {
        path:"/about",
        element:<About></About>
      },
      {
        path:"/contact",
        element:<Contact></Contact>
      },
      {
        path: "/login", // Login path (relative to "/")
        element: <Login />,
      },
      {
        path: "/signup", 
        element: <SignUp />,
      },
      {
        path: "/image", 
        element:<PrivateRoute><TextToImage></TextToImage></PrivateRoute>,
      },
      {
        path: "/ProductPage/:id",
        element:<ProductPage />, 
      },
      {
        path:"/Products",
        element:<AllProductsPage></AllProductsPage>
      }
    ],
  },
  {
      path: 'dashboard',
      element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children:[
             {
              path:'/dashboard',
              element:<MyProfile></MyProfile>
             },
             {
              path:"/dashboard/faq",
              element:<FaqPage></FaqPage>
             },
             {
              path:"/dashboard/Stat",
              element:<MyProductStatistics></MyProductStatistics>
             },
             {
              path:'/dashboard/addProduct',
              element:<AddProductPage></AddProductPage>
             },
             {
              path:'/dashboard/myProducts',
              element:<MyProductsPage></MyProductsPage>
             },
             {
              path:'/dashboard/payment',
              element:<Payment></Payment>
             },
             {
              path:'update-product/:id',
              element:<UpdateProductPage></UpdateProductPage>
             },
             {
              path:'/dashboard/reviewQueue',
              element:<Product></Product>
             },
             {
              path:'/dashboard/reportedContents',
              element:<ReportedContent></ReportedContent>
             },
             {
              path:'/dashboard/manageCoupons',
              element:<AdminCouponsPage></AdminCouponsPage>
             },
             {
              path:'/dashboard/manageUsers',
              element:<ManageUsers></ManageUsers>
             }
             ,{
              path:'/dashboard/statistics',
              element:<AdminStatistics></AdminStatistics>
             }
      ]
  },
  {
    path:"*",
    element:<NotFound></NotFound>

}
]);

export default router;
