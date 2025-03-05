// src/components/EconomyCityLanding/EconomyCityLanding.js

import React, { Suspense } from 'react';
import styles from './EconomyCityLanding.module.css';
import Hero from '../Hero/Hero'; // Component Hero không cần lazy loading
import Features from '../Features/Features'; // Features cũng không cần lazy loading

// Lazy load các component khác
const Products = React.lazy(() => import('../Products/Products'));
const TypicalFloor = React.lazy(() => import('../TypicalFloor/TypicalFloor'));
const Gallery = React.lazy(() => import('../Gallery/Gallery'));
const Contact = React.lazy(() => import('../Contact/Contact'));
const Legal = React.lazy(() => import('../Legal/Legal'));
const SalesPolicy = React.lazy(() => import('../SalesPolicy/SalesPolicy'));
const PriceList = React.lazy(() => import('../PriceList/PriceList'));
const FAQ = React.lazy(() => import('../FAQ/FAQ'));

const EconomyCityLanding = () => {
  return (
    <div className={styles.landingWrapper}>
      {/* Component Hero không cần lazy loading */}
      <div id="hero">
        <Hero />
      </div>

      {/* Features cũng không cần lazy loading */}
      <div id="features">
        <Features />
      </div>

      {/* Sử dụng Suspense để bọc các component lazy */}
      <Suspense fallback={<div>Loading...</div>}>
        <div id="products">
          <Products />
        </div>

        <div id="typicalFloor">
          <TypicalFloor />
        </div>

        <div id="legal">
          <Legal />
        </div>

        <div id="priceList">
          <PriceList />
        </div>

        <div id="salesPolicy">
          <SalesPolicy />
        </div>

        <div id="gallery">
          <Gallery />
        </div>

        <div id="FAQ">
          <FAQ />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </div>
  );
};

export default EconomyCityLanding;