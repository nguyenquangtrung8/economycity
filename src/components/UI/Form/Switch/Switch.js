// src/components/UI/Form/Switch/Switch.js
import React, { forwardRef } from 'react';
import styles from './Switch.module.css';

/**
 * Switch component - Toggle switch
 * @param {string} name - Tên switch
 * @param {boolean} checked - Trạng thái checked
 * @param {function} onChange - Handler khi trạng thái thay đổi
 * @param {ReactNode} label - Label text
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {string} error - Thông báo lỗi
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {string} className - Class bổ sung
 */
const Switch = forwardRef(({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  size = 'md',
  className = '',
  ...rest
}, ref) => {
  return (
    <div className={`${styles.switchWrapper} ${className}`}>
      <label className={`
        ${styles.switchLabel}
        ${disabled ? styles.switchDisabled : ''}
        ${error ? styles.switchError : ''}
        ${styles[`switch-${size}`]}
      `}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.switchInput}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        
        <span className={styles.switchControl}>
          <span className={styles.switchThumb}></span>
        </span>
        
        {label && <span className={styles.switchText}>{label}</span>}
      </label>
      
      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

export default React.memo(Switch);