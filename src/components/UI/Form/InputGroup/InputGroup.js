import React from 'react';
import styles from './InputGroup.module.css';

/**
 * InputGroup component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const InputGroup = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.inputGroup} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default InputGroup;
