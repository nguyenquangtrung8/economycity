// src/components/UI/Form/Input/Input.js
import React, { forwardRef } from 'react';
import styles from './Input.module.css';

/**
 * Input component - Component nhập liệu với nhiều biến thể và tính năng
 * @param {string} name - Tên input
 * @param {string} type - Loại input (text, email, password, etc.)
 * @param {string} value - Giá trị của input
 * @param {function} onChange - Handler khi giá trị thay đổi
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {boolean} readOnly - Trạng thái chỉ đọc
 * @param {string} error - Thông báo lỗi
 * @param {ReactNode} startAdornment - Element hiển thị ở đầu input
 * @param {ReactNode} endAdornment - Element hiển thị ở cuối input
 * @param {string} className - Class bổ sung
 */
const Input = forwardRef(({
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  error,
  startAdornment,
  endAdornment,
  className = '',
  ...rest
}, ref) => {
  const hasAdornment = startAdornment || endAdornment;

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <div className={`
        ${styles.inputContainer}
        ${error ? styles.inputError : ''}
        ${disabled ? styles.inputDisabled : ''}
        ${hasAdornment ? styles.hasAdornment : ''}
      `}>
        {startAdornment && (
          <div className={styles.startAdornment}>
            {startAdornment}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={`
            ${styles.input}
            ${startAdornment ? styles.hasStartAdornment : ''}
            ${endAdornment ? styles.hasEndAdornment : ''}
          `}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        
        {endAdornment && (
          <div className={styles.endAdornment}>
            {endAdornment}
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

Input.displayName = 'Input';

export default React.memo(Input);