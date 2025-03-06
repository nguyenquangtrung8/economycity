// src/components/UI/Form/Textarea/Textarea.js
import React, { forwardRef } from 'react';
import styles from './Textarea.module.css';

/**
 * Textarea component - Component nhập liệu nhiều dòng
 * @param {string} name - Tên textarea
 * @param {string} value - Giá trị của textarea
 * @param {function} onChange - Handler khi giá trị thay đổi
 * @param {string} placeholder - Placeholder text
 * @param {number} rows - Số dòng của textarea
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {boolean} readOnly - Trạng thái chỉ đọc
 * @param {string} error - Thông báo lỗi
 * @param {boolean} resizable - Cho phép resize textarea
 * @param {string} className - Class bổ sung
 */
const Textarea = forwardRef(({
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  readOnly = false,
  error,
  resizable = true,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className={`${styles.textareaWrapper} ${className}`}>
      <div className={`
        ${styles.textareaContainer}
        ${error ? styles.textareaError : ''}
        ${disabled ? styles.textareaDisabled : ''}
        ${!resizable ? styles.notResizable : ''}
      `}>
        <textarea
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          readOnly={readOnly}
          className={styles.textarea}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
      </div>
      
      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default React.memo(Textarea);