// src/components/UI/Typography/Badge/Badge.js
import React from 'react';
import styles from './Badge.module.css';

/**
 * Badge Component - Hiển thị nhãn nhỏ (hot, new, etc.) để đánh dấu trạng thái
 * @param {ReactNode} children - Nội dung hiển thị
 * @param {string} className - Class bổ sung
 * @param {string} variant - Biến thể (primary, secondary, success, warning, danger, info)
 * @param {string} size - Kích thước (sm, md)
 * @param {boolean} pill - Hiển thị dạng viên thuốc bo tròn hoàn toàn
 * @param {boolean} outline - Hiển thị chỉ viền không có background
 * @param {ReactNode} icon - Icon đi kèm
 */
const Badge = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  pill = false,
  outline = false,
  icon,
  ...rest 
}) => {
  return (
    <span 
      className={`
        ${styles.badge} 
        ${styles[`badge-${variant}`]} 
        ${styles[`size-${size}`]}
        ${pill ? styles.pill : ''}
        ${outline ? styles.outline : ''}
        ${icon ? styles.withIcon : ''}
        ${className}
      `}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;