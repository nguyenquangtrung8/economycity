import React from 'react';
import styles from './Alert.module.css';

/**
 * Alert component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Alert = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.alert} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Alert;
