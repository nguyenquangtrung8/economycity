import React from 'react';
import styles from './Popover.module.css';

/**
 * Popover component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Popover = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.popover} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Popover;
