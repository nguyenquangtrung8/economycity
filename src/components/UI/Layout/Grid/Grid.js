import React from 'react';
import styles from './Grid.module.css';

/**
 * Grid component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Grid = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.grid} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Grid;
