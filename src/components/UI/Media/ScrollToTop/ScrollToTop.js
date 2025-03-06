import React from 'react';
import styles from './ScrollToTop.module.css';

/**
 * ScrollToTop component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const ScrollToTop = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.scrollToTop} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ScrollToTop;
