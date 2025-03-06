// src/components/UI/Media/ScrollToTop/ScrollToTop.js
import React, { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.css';

/**
 * ScrollToTop Component - Nút cuộn lên đầu trang
 * @param {number} showAtHeight - Chiều cao khi hiển thị nút (pixel)
 * @param {string} position - Vị trí (bottom-right, bottom-left, top-right, top-left)
 * @param {boolean} smooth - Smooth scrolling
 * @param {string} className - Class bổ sung
 * @param {string} ariaLabel - Nhãn aria cho accessibility
 */
const ScrollToTop = ({
  showAtHeight = 300,
  position = 'bottom-right',
  smooth = true,
  className = '',
  ariaLabel = 'Cuộn lên đầu trang',
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra vị trí cuộn để hiển thị/ẩn nút
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAtHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Kiểm tra ngay lập tức khi component được mount
    toggleVisibility();
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAtHeight]);

  // Xử lý sự kiện click để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  // Xử lý phím Enter hoặc Space cho accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <>
      {isVisible && (
        <button
          className={`${styles.scrollToTop} ${styles[position]} ${className}`}
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          aria-label={ariaLabel}
          tabIndex="0"
          role="button"
          {...rest}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
            className={styles.icon}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;