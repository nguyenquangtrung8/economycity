// src/components/UI/Media/Carousel/Carousel.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Carousel.module.css';

/**
 * Carousel Component - Slider hình ảnh với các tính năng cơ bản
 * @param {Array} items - Mảng các slide items, mỗi item có dạng { id, src, alt, caption }
 * @param {boolean} autoPlay - Tự động chuyển slide
 * @param {number} interval - Thời gian giữa các slides (ms)
 * @param {boolean} showIndicators - Hiển thị chỉ báo slide
 * @param {boolean} showArrows - Hiển thị mũi tên điều hướng
 * @param {string} className - Class bổ sung
 * @param {Function} onSlideChange - Handler khi thay đổi slide
 */
const Carousel = ({
  items = [],
  autoPlay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  className = '',
  onSlideChange,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoPlayTimerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Chuyển đến slide trước
  const goToPrevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  }, [items.length, onSlideChange]);

  // Chuyển đến slide tiếp theo
  const goToNextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
      if (onSlideChange) onSlideChange(newIndex);
      return newIndex;
    });
  }, [items.length, onSlideChange]);

  // Chuyển đến slide cụ thể
  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
    if (onSlideChange) onSlideChange(index);
  }, [onSlideChange]);

  // Xử lý autoplay
  useEffect(() => {
    // Nếu không có autoplay hoặc đang hover thì không autoplay
    if (!autoPlay || isHovering || items.length <= 1) return;

    // Bắt đầu autoplay
    autoPlayTimerRef.current = setInterval(goToNextSlide, interval);

    // Cleanup khi unmount hoặc dependencies thay đổi
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, isHovering, interval, items.length, goToNextSlide]);

  // Touch handlers cho mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartXRef.current - touchEndXRef.current;
    
    // Nếu di chuyển đủ xa (35px) thì chuyển slide
    if (touchDiff > 35) {
      goToNextSlide(); // Swipe left -> next slide
    } else if (touchDiff < -35) {
      goToPrevSlide(); // Swipe right -> prev slide
    }
  };

  // Xử lý keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      goToNextSlide();
    }
  };

  return (
    <div 
      className={`${styles.carousel} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Hình ảnh slideshow"
      {...rest}
    >
      {/* Slides container */}
      <div className={styles.slidesContainer}>
        {items.map((item, index) => (
          <div 
            key={item.id || index}
            className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <img 
              src={item.src} 
              alt={item.alt || `Slide ${index + 1}`}
              className={styles.slideImage}
              loading="lazy"
            />
            {item.caption && (
              <div className={styles.caption}>
                <p>{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mũi tên điều hướng */}
      {showArrows && items.length > 1 && (
        <>
          <button 
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={goToPrevSlide}
            aria-label="Slide trước"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={goToNextSlide}
            aria-label="Slide tiếp theo"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
      
      {/* Indicators (dots) */}
      {showIndicators && items.length > 1 && (
        <div className={styles.indicators}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Chuyển đến slide ${index + 1}`}
              aria-selected={index === activeIndex}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;