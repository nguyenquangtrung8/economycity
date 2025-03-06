// src/components/UI/Typography/Subtitle/Subtitle.js
import React from 'react';
import styles from './Subtitle.module.css';

/**
 * Subtitle component - Tiêu đề phụ thường đi kèm với Title
 * @param {ReactNode} children - Nội dung hiển thị bên trong subtitle
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} align - Căn chỉnh text (left, center, right)
 * @param {string} variant - Biến thể (default, muted, light)
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {boolean} gutterBottom - Có thêm margin-bottom hay không
 */
const Subtitle = ({ 
  children,
  className = '',
  align = 'left',
  variant = 'default',
  size = 'md',
  gutterBottom = true,
  ...rest
}) => {
  return (
    <p
      className={`
        ${styles.subtitle}
        ${styles[`align-${align}`]}
        ${styles[`variant-${variant}`]}
        ${styles[`size-${size}`]}
        ${gutterBottom ? styles.gutterBottom : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Subtitle;