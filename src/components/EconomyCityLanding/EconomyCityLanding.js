// src/components/EconomyCityLanding/EconomyCityLanding.js

import React from 'react';
import styles from './EconomyCityLanding.module.css';
import Hero from '../Hero/Hero';
import Features from '../Features/Features';
import Products from '../Products/Products';
import TypicalFloor from '../TypicalFloor/TypicalFloor';
import Gallery from '../Gallery/Gallery';
import Contact from '../Contact/Contact';
import Legal from '../Legal/Legal';
import SalesPolicy from '../SalesPolicy/SalesPolicy';
import PriceList from '../PriceList/PriceList';
import FAQ from '../FAQ/FAQ';

const EconomyCityLanding = () => {
  return (
    <div className={styles.landingWrapper}>
      <div id="hero">
        <Hero />
      </div>
      
      <div id="features">
        <Features />
      </div>

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
    </div>
  );
};

export default EconomyCityLanding;