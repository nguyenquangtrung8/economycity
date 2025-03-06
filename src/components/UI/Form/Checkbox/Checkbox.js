// src/components/UI/Form/Checkbox/Checkbox.js
import React, { forwardRef } from 'react';
import styles from './Checkbox.module.css';

/**
 * Checkbox component - Input type checkbox với styling
 * @param {string} name - Tên checkbox
 * @param {boolean} checked - Trạng thái checked
 * @param {function} onChange - Handler khi trạng thái thay đổi
 * @param {ReactNode} label - Label text
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {string} error - Thông báo lỗi
 * @param {string} className - Class bổ sung
 * @param {boolean} indeterminate - Trạng thái không xác định
 */
const Checkbox = forwardRef(({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  className = '',
  indeterminate = false,
  ...rest
}, ref) => {
  const checkboxRef = React.useRef(null);
  
  // Combine refs
  const setRef = React.useCallback((element) => {
    checkboxRef.current = element;
    
    // Set indeterminate property
    if (element) {
      element.indeterminate = indeterminate;
    }
    
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  }, [ref, indeterminate]);

  return (
    <div className={`${styles.checkboxWrapper} ${className}`}>
      <label className={`
        ${styles.checkboxLabel}
        ${disabled ? styles.checkboxDisabled : ''}
        ${error ? styles.checkboxError : ''}
      `}>
        <input
          ref={setRef}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.checkboxInput}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        
        <span className={styles.checkboxControl}>
          {(checked || indeterminate) && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {indeterminate ? (
                <line x1="4" y1="12" x2="20" y2="12"></line>
              ) : (
                <polyline points="20 6 9 17 4 12"></polyline>
              )}
            </svg>
          )}
        </span>
        
        {label && <span className={styles.checkboxText}>{label}</span>}
      </label>