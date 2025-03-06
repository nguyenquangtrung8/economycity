// src/components/UI/Typography/Label/Label.js
import React from 'react';
import styles from './Label.module.css';

/**
 * Label component - Nhãn dùng cho form elements hoặc làm label text chung
 * @param {ReactNode} children - Nội dung hiển thị bên trong label
 * @param {string} htmlFor - ID của element mà label liên kết đến
 * @param {boolean} required - Hiển thị dấu * bắt buộc
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {boolean} disabled - Trạng thái vô hiệu hóa
 * @param {boolean} error - Trạng thái lỗi
 */
const Label = ({ 
  children,
  htmlFor,
  required = false,
  className = '',
  size = 'md',
  disabled = false,
  error = false,
  ...rest
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        ${styles.label}
        ${styles[`size-${size}`]}
        ${disabled ? styles.disabled : ''}
        ${error ? styles.error : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
      {required && <span className={styles.requiredIndicator}>*</span>}
    </label>
  );
};

export default Label;