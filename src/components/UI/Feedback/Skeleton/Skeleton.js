import React from 'react';
import styles from './Skeleton.module.css';

/**
 * Skeleton component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Skeleton = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.skeleton} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Skeleton;
