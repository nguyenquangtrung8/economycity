import React from 'react';
import styles from './Modal.module.css';

/**
 * Modal component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Modal = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.modal} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Modal;
