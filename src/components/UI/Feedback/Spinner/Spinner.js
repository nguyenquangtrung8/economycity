import React from 'react';
import styles from './Spinner.module.css';

/**
 * Spinner component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Spinner = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.spinner} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Spinner;
