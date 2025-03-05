// src/components/EconomyCityLanding/Hero/Hero.js
import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { projectData } from '../common/data';

const Hero = () => {
  const texts = [
    "Khu đô thị kiểu mẫu phía Đông Hà Nội",
    "Mua khi thị trấn nhỏ, giàu khi thành phố to"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Typing Effect Logic
  useEffect(() => {
    if (isFadingOut) return;

    const currentText = texts[currentIndex];
    let index = 0;

    const typingTimer = setInterval(() => {
      setDisplayText(currentText.slice(0, index));
      index++;
      if (index > currentText.length) {
        clearInterval(typingTimer);
        setTimeout(() => setIsFadingOut(true), 3000); // Hiển thị text trong 3 giây
      }
    }, 100); // Tốc độ typing: 100ms

    return () => clearInterval(typingTimer);
  }, [currentIndex, isFadingOut]);

  useEffect(() => {
    if (!isFadingOut) return;

    const fadeOutTimer = setTimeout(() => {
      setDisplayText('');
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setIsFadingOut(false);
    }, 500); // Thời gian fade out: 500ms

    return () => clearTimeout(fadeOutTimer);
  }, [isFadingOut]);

  // Scroll handler
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <img 
        src="/img/hero-bg.jpg" 
        alt="Economy City Văn Lâm" 
        className={styles.heroBackground}
        loading="lazy"
      />
      <div className={styles.overlay}></div>

      {/* Main Content */}
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          {/* Project Logo (Optional) */}
          {/* <img 
            src="/img/logo.jpg" 
            alt="Economy City" 
            className={styles.projectLogo}
          /> */}

          {/* Title */}
          <h1 className={styles.title}>{projectData.name}</h1>

          {/* Typing Effect */}
          <div className={styles.typingContainer}>
            <p className={styles.subtitle}>
              <span 
                className={`${styles.typingText} ${isFadingOut ? styles.fadeOut : ''}`}
              >
                {displayText}
              </span>
              {!isFadingOut && <span className={styles.cursor}></span>}
            </p>
          </div>

          {/* Location */}
          <div className={styles.location}>
            <svg 
              className={styles.locationIcon}
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {projectData.location}
          </div>

          {/* Buttons */}
          <div className={styles.buttonsContainer}>
            <a href="#san-pham" className={styles.ctaButton}>Xem sản phẩm</a>
            <a href="#lien-he" className={styles.secondaryButton}>Liên hệ ngay</a>
          </div>

          {/* Stats Grid */}
          <div className={styles.statsContainerBelow}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>37ha</div>
                <div className={styles.statLabel}>Tổng diện tích</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>1,044</div>
                <div className={styles.statLabel}>Sản phẩm thấp tầng</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>30+</div>
                <div className={styles.statLabel}>Tiện ích nội khu</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>107tr</div>
                <div className={styles.statLabel}>Giá chỉ từ/m²</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} onClick={scrollToFeatures} role="button" tabIndex="0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="7 13 12 18 17 13"></polyline>
          <polyline points="7 6 12 11 17 6"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;