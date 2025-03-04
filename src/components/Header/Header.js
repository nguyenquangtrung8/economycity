// src/components/EconomyCityLanding/Header/Header.js

import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { projectData } from '../common/data';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>
          <img src="/img/logo.png" alt={projectData.name} width="40" height="40" />
          <span className={styles.logoText}>Economy City</span>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#tong-quan" className={styles.navLink}>Tổng quan</a>
            </li>
            <li className={styles.navItem}>
              <a href="#vi-tri" className={styles.navLink}>Vị trí</a>
            </li>
            <li className={styles.navItem}>
              <a href="#tien-ich" className={styles.navLink}>Tiện ích</a>
            </li>
            <li className={styles.navItem}>
              <a href="#san-pham" className={styles.navLink}>Sản phẩm</a>
            </li>
            <li className={styles.navItem}>
              <a href="#thu-vien" className={styles.navLink}>Thư viện</a>
            </li>
            <li className={styles.navItem}>
              <a href="#lien-he" className={styles.contactBtn}>Liên hệ</a>
            </li>
          </ul>
        </nav>

        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <button className={styles.mobileMenuClose} onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <ul className={styles.mobileNavList}>
          <li className={styles.mobileNavItem}>
            <a href="#tong-quan" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Tổng quan</a>
          </li>
          <li className={styles.mobileNavItem}>
            <a href="#vi-tri" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Vị trí</a>
          </li>
          <li className={styles.mobileNavItem}>
            <a href="#tien-ich" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Tiện ích</a>
          </li>
          <li className={styles.mobileNavItem}>
            <a href="#san-pham" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Sản phẩm</a>
          </li>
          <li className={styles.mobileNavItem}>
            <a href="#thu-vien" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Thư viện</a>
          </li>
          <li className={styles.mobileNavItem}>
            <a href="#lien-he" className={styles.mobileNavLink} onClick={toggleMobileMenu}>Liên hệ</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;