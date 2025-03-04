// src/components/EconomyCityLanding/EconomyCityLanding.js

import React from 'react';
import styles from './EconomyCityLanding.module.css';
import Features from '../Features/Features';
import Hero from '../Hero/Hero';
import Products from '../Products/Products';
import TypicalFloor from '../TypicalFloor/TypicalFloor';
import Gallery from '../Gallery/Gallery';
import Contact from '../Contact/Contact';
import Legal from '../Legal/Legal';
import SalesPolicy from '../SalesPolicy/SalesPolicy';
import PriceList from '../PriceList/PriceList';

// Import các components con


const EconomyCityLanding = () => {
  return (
    <div className={styles.landingWrapper}>
      <Hero />
      <Features /> 
      <Products />
      <TypicalFloor />
      <Legal />
      <PriceList />
      <SalesPolicy />
      <Gallery />
      <Contact />
    </div>
  );
};

export default EconomyCityLanding;