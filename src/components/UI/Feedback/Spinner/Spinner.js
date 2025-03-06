// src/components/UI/Feedback/Spinner/Spinner.js
import React from 'react';
import styles from './Spinner.module.css';

/**
 * Spinner component - Biểu tượng loading
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {string} color - Màu sắc (primary, secondary, success, warning, danger, light, dark)
 * @param {string} variant - Biến thể (border, dots, grow)
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} label - Label cho screen readers
 */
const Spinner = ({
  size = 'md',
  color = 'primary',
  variant = 'border',
  className = '',
  label = 'Loading...',
  ...rest
}) => {
  // Render spinner dựa trên variant
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div 
            className={`
              ${styles.dots}
              ${styles[`dots-${size}`]}
              ${styles[`dots-${color}`]}
              ${className}
            `}
            role="status"
            aria-label={label}
            {...rest}
          >
            <div></div>
            <div></div>
            <div></div>
            <span className={styles.srOnly}>{label}</span>
          </div>
        );
      case 'grow':
        return (
          <div 
            className={`
              ${styles.grow}
              ${styles[`grow-${size}`]}
              ${styles[`grow-${color}`]}
              ${className}
            `}
            role="status"
            aria-label={label}
            {...rest}
          >
            <span className={styles.srOnly}>{label}</span>
          </div>
        );
      case 'border':
      default:
        return (
          <div 
            className={`
              ${styles.border}
              ${styles[`border-${size}`]}
              ${styles[`border-${color}`]}
              ${className}
            `}
            role="status"
            aria-label={label}
            {...rest}
          >
            <span className={styles.srOnly}>{label}</span>
          </div>
        );
    }
  };

  return renderSpinner();
};

export default Spinner;