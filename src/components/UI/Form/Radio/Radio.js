// src/components/UI/Form/Radio/Radio.js
import React, { forwardRef } from 'react';
import styles from './Radio.module.css';

/**
 * Radio component - Input type radio với styling
 * @param {string} name - Tên radio
 * @param {string|number} value - Giá trị của radio
 * @param {boolean} checked - Trạng thái checked
 * @param {function} onChange - Handler khi trạng thái thay đổi
 * @param {ReactNode} label - Label text
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {string} error - Thông báo lỗi
 * @param {string} className - Class bổ sung
 */
const Radio = forwardRef(({
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className={`${styles.radioWrapper} ${className}`}>
      <label className={`
        ${styles.radioLabel}
        ${disabled ? styles.radioDisabled : ''}
        ${error ? styles.radioError : ''}
      `}>
        <input
          ref={ref}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.radioInput}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        
        <span className={styles.radioControl}>
          {checked && <span className={styles.radioInner}></span>}
        </span>
        
        {label && <span className={styles.radioText}>{label}</span>}
      </label>
      
      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export default React.memo(Radio);