import React, { Suspense } from 'react';
import Hero from '../Hero/Hero'; // Component Hero không cần lazy loading
import Features from '../Features/Features'; // Bỏ lazy loading
import Products from '../Products/Products'; // Bỏ lazy loading

// Lazy load các component còn lại
// const Location = React.lazy(() => import('../Location/Location')); // Tạm bỏ component Location
const TypicalFloor = React.lazy(() => import('../TypicalFloor/TypicalFloor'));
const Gallery = React.lazy(() => import('../Gallery/Gallery'));
const PriceList = React.lazy(() => import('../PriceList/PriceList'));
const SalesPolicy = React.lazy(() => import('../SalesPolicy/SalesPolicy'));
const Legal = React.lazy(() => import('../Legal/Legal'));
const FAQ = React.lazy(() => import('../FAQ/FAQ'));
const Progress = React.lazy(() => import('../Progress/Progress'));
const Contact = React.lazy(() => import('../Contact/Contact'));

// Economy City Landing Page Component
const EconomyCityLanding = () => {
  return (
    <div className="landing-page">
      {/* Hero không sử dụng lazy loading */}
      <div id="hero">
        <Hero />
      </div>

      {/* Features không sử dụng lazy loading */}
      <div id="features">
        <Features />
      </div>

      {/* Products không sử dụng lazy loading */}
      <div id="products">
        <Products />
      </div>

      {/* Sử dụng Suspense để bọc các component lazy */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Location đã được tạm bỏ
        <div id="location">
          <Location />
        </div>
        */}

        {/* TypicalFloor đã được chuyển sang lazy loading */}
        <div id="typicalFloor">
          <TypicalFloor />
        </div>

        {/* PriceList đã được chuyển sang lazy loading */}
        <div id="priceList">
          <PriceList />
        </div>

        {/* SalesPolicy đã được chuyển sang lazy loading */}
        <div id="salesPolicy">
          <SalesPolicy />
        </div>

        {/* Legal đã được chuyển sang lazy loading */}
        <div id="legal">
          <Legal />
        </div>

        {/* Gallery đã được chuyển sang lazy loading */}
        <div id="gallery">
          <Gallery />
        </div>

        {/* Progress đã được chuyển sang lazy loading */}
        <div id="progress">
          <Progress />
        </div>

        {/* FAQ đã được chuyển sang lazy loading */}
        <div id="FAQs">
          <FAQ />
        </div>

        {/* Contact đã được chuyển sang lazy loading */}
        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </div>
  );
};

export default EconomyCityLanding;