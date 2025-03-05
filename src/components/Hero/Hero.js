// src/components/Hero/Hero.js
import React from 'react';
import styles from './Hero.module.css';
import { heroData } from './HeroData';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const Hero = () => {
  // Sử dụng custom hook cho hiệu ứng typing
  const { displayText, isFadingOut, isTyping } = useTypingEffect(
    heroData.typingTexts,
    100, // typing speed (ms)
    3000 // display duration (ms)
  );

  // Xử lý scroll xuống phần Features
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} aria-label="Giới thiệu dự án">
      {/* Hình nền với thuộc tính đầy đủ để tối ưu hiệu năng */}
      <img 
        src={heroData.backgroundImage.src} 
        alt={heroData.backgroundImage.alt} 
        className={styles.heroBackground}
        loading="lazy"
        width={heroData.backgroundImage.width}
        height={heroData.backgroundImage.height}
      />
      <div className={styles.overlay} aria-hidden="true"></div>

      {/* Nội dung chính */}
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          {/* Tiêu đề */}
          <h1 className={styles.title}>{heroData.title}</h1>

          {/* Hiệu ứng typing với accessibility cải tiến */}
          <div className={styles.typingContainer}>
            <p 
              className={styles.subtitle}
              role="status" 
              aria-live="polite"
              aria-atomic="true"
            >
              <span 
                className={`${styles.typingText} ${isFadingOut ? styles.fadeOut : ''}`}
              >
                {displayText}
              </span>
              {isTyping && <span className={styles.cursor} aria-hidden="true"></span>}
            </p>
          </div>

          {/* Vị trí */}
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
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {heroData.location}
          </div>

          {/* Nút CTA */}
          <div className={styles.buttonsContainer}>
            {heroData.buttons.map((button, index) => (
              <a 
                key={index}
                href={button.link} 
                className={button.type === 'primary' ? styles.ctaButton : styles.secondaryButton}
              >
                {button.text}
              </a>
            ))}
          </div>

          {/* Khối thống kê */}
          <div className={styles.statsContainerBelow}>
            <div className={styles.statsGrid}>
              {heroData.stats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nút cuộn xuống với accessibility cải tiến */}
      <div 
        className={styles.scrollIndicator} 
        onClick={scrollToFeatures} 
        role="button" 
        tabIndex="0"
        aria-label="Cuộn xuống xem thêm thông tin"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToFeatures();
          }
        }}
      >
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
          aria-hidden="true"
        >
          <polyline points="7 13 12 18 17 13"></polyline>
          <polyline points="7 6 12 11 17 6"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;