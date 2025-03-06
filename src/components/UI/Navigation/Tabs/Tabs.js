import React from 'react';
import styles from './Tabs.module.css';

/**
 * Tabs component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Tabs = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.tabs} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Tabs;
