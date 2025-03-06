// src/components/UI/Form/FormLabel/FormLabel.js
import React from 'react';
import styles from './FormLabel.module.css';

/**
 * FormLabel component - Nhãn cho form elements
 * @param {ReactNode} children - Label text
 * @param {string} htmlFor - ID của element
 * @param {boolean} required - Hiển thị dấu (*) nếu required
 * @param {string} className - Class bổ sung
 */
const FormLabel = ({
  children,
  htmlFor,
  required = false,
  className = '',
  ...rest
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.formLabel} ${className}`}
      {...rest}
    >
      {children}
      {required && (
        <span className={styles.requiredIndicator} aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
};

export default React.memo(FormLabel);