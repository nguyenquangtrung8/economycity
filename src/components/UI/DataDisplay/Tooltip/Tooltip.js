import React from 'react';
import styles from './Tooltip.module.css';

/**
 * Tooltip component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Tooltip = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.tooltip} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Tooltip;
