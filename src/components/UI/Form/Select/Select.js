// src/components/UI/Form/Select/Select.js
import React, { forwardRef } from 'react';
import styles from './Select.module.css';

/**
 * Select component - Dropdown select
 * @param {string} name - Tên select
 * @param {string|number} value - Giá trị đã chọn
 * @param {function} onChange - Handler khi thay đổi giá trị
 * @param {Array} options - Mảng các options (dạng {value, label})
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {string} error - Thông báo lỗi
 * @param {boolean} multiple - Cho phép chọn nhiều
 * @param {string} className - Class bổ sung
 */
const Select = forwardRef(({
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Chọn một...',
  disabled = false,
  error,
  multiple = false,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className={`${styles.selectWrapper} ${className}`}>
      <div className={`
        ${styles.selectContainer}
        ${error ? styles.selectError : ''}
        ${disabled ? styles.selectDisabled : ''}
      `}>
        <select
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          multiple={multiple}
          className={styles.select}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {!multiple && (
          <div className={styles.selectArrow}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default React.memo(Select);