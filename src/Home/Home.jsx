import React from 'react';
import Banner from '../Page/Banner';
import FeaturedProducts from '../Page/FeaturedProducts';
import TrendingProducts from '../Page/TrendingProducts';
import CouponCarousel from '../Page/CouponCarousel';

const Home = () => {
    return (
        <div>
           <section className="text-gray-800 dark:text-gray-100">
            <Banner />
        
      </section>
           <section className="text-gray-800 dark:text-gray-100">
            <FeaturedProducts></FeaturedProducts>
        
      </section>
           <section className="text-gray-800 dark:text-gray-100">
            <TrendingProducts></TrendingProducts>
        
      </section>
           <section className="text-gray-800 dark:text-gray-100">
            <CouponCarousel></CouponCarousel>
        
      </section>
      

        </div>
    );
};

export default Home;