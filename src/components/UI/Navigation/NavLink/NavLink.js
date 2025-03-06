// src/components/UI/Navigation/NavLink/NavLink.js
import React from 'react';
import styles from './NavLink.module.css';

/**
 * NavLink Component - Link điều hướng với các trạng thái
 * @param {ReactNode} children - Nội dung hiển thị
 * @param {string} href - Đường dẫn
 * @param {boolean} isActive - Trạng thái active
 * @param {Function} onClick - Handler khi click
 * @param {boolean} disabled - Vô hiệu hóa link
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} target - Target attribute (_blank, _self, etc.)
 * @param {string} variant - Biến thể (default, button, underline)
 * @param {ReactNode} icon - Icon hiển thị trước text
 * @param {boolean} iconRight - Hiển thị icon bên phải
 */
const NavLink = ({
  children,
  href = '#',
  isActive = false,
  onClick,
  disabled = false,
  className = '',
  target = '_self',
  variant = 'default',
  icon,
  iconRight = false,
  ...rest
}) => {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={disabled ? '#' : href}
      className={`
        ${styles.navLink}
        ${styles[`navLink-${variant}`]}
        ${isActive ? styles.active : ''}
        ${disabled ? styles.disabled : ''}
        ${className}
      `}
      onClick={handleClick}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={disabled}
      {...rest}
    >
      {!iconRight && icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
      {iconRight && icon && <span className={`${styles.icon} ${styles.iconRight}`}>{icon}</span>}
    </a>
  );
};

export default NavLink;