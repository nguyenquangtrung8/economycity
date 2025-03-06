// src/components/UI/Form/FormGroup/FormGroup.js
import React from 'react';
import styles from './FormGroup.module.css';
import FormLabel from '../FormLabel/FormLabel';

/**
 * FormGroup component - Container cho form elements
 * @param {ReactNode} children - Form elements
 * @param {string} label - Label text
 * @param {string} htmlFor - ID của form element
 * @param {string} error - Thông báo lỗi
 * @param {boolean} required - Hiển thị dấu (*) nếu required
 * @param {string} className - Class bổ sung
 * @param {string} helperText - Text trợ giúp bổ sung
 * @param {ReactNode} labelEnd - Element hiển thị ở cuối label (e.g. tooltip)
 */
const FormGroup = ({
  children,
  label,
  htmlFor,
  error,
  required = false,
  className = '',
  helperText,
  labelEnd,
  ...rest
}) => {
  // Kiểm tra children để xác định liệu form element có error prop
  const childrenWithError = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        error: error || child.props.error,
        id: htmlFor || child.props.id,
        ...child.props,
      });
    }
    return child;
  });

  return (
    <div className={`${styles.formGroup} ${className}`} {...rest}>
      {label && (
        <div className={styles.labelWrapper}>
          <FormLabel htmlFor={htmlFor} required={required}>
            {label}
          </FormLabel>
          
          {labelEnd && (
            <div className={styles.labelEnd}>
              {labelEnd}
            </div>
          )}
        </div>
      )}
      
      {childrenWithError}
      
      {helperText && !error && (
        <div className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default React.memo(FormGroup);