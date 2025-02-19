import React from 'react';
import Banner from '../Page/Banner';
import FeaturedProducts from '../Page/FeaturedProducts';
import TrendingProducts from '../Page/TrendingProducts';
import CouponCarousel from '../Page/CouponCarousel';
import About from '../Page/About/About';
import Contact from '../Page/Contact/Contact';

const Home = () => {
    return (
        <div>
           <section className="text-gray-800 dark:text-gray-100">
            <Banner />
        
      </section>
           <section className="text-gray-800 dark:text-gray-100">
            <FeaturedProducts></FeaturedProducts>
        
      </section>
      <section >
        <About></About>
      </section>
      
           <section className="text-gray-800 dark:text-gray-100">
            <TrendingProducts></TrendingProducts>
        
      </section>
           <section className="text-gray-800 dark:text-gray-100 ">
            <CouponCarousel></CouponCarousel>
        
      </section>

      <section >
        <Contact></Contact>
      </section>
      

        </div>
    );
};

export default Home;