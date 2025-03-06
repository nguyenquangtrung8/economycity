// src/components/UI/Form/Button/Button.js
import React from 'react';
import styles from './Button.module.css';

/**
 * Button component - Nút với nhiều biến thể và kích thước
 * @param {ReactNode} children - Nội dung hiển thị bên trong nút
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} variant - Biến thể (primary, secondary, outline)
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {string} type - Loại button (button, submit, reset)
 * @param {boolean} disabled - Vô hiệu hóa nút
 * @param {function} onClick - Hàm xử lý sự kiện click
 * @param {ReactNode} startIcon - Icon ở đầu nút
 * @param {ReactNode} endIcon - Icon ở cuối nút
 * @param {boolean} fullWidth - Nút chiếm toàn bộ chiều rộng
 */
const Button = ({ 
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  fullWidth = false,
  'aria-label': ariaLabel,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`
        ${styles.button}
        ${styles[`button-${variant}`]}
        ${styles[`button-${size}`]}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || undefined}
      {...rest}
    >
      {startIcon && (
        <span className={styles.startIcon} aria-hidden="true">
          {startIcon}
        </span>
      )}
      <span className={styles.content}>{children}</span>
      {endIcon && (
        <span className={styles.endIcon} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
};

export default React.memo(Button);