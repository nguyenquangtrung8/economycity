import React from 'react';
import styles from './Toast.module.css';

/**
 * Toast component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Toast = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.toast} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Toast;
