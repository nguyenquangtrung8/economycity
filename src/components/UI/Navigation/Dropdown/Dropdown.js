import React from 'react';
import styles from './Dropdown.module.css';

/**
 * Dropdown component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Dropdown = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.dropdown} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Dropdown;
