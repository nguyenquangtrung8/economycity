// src/components/UI/Feedback/Toast/Toast.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Toast.module.css';

/**
 * Toast component - Thông báo tự động biến mất
 * @param {ReactNode} children - Nội dung thông báo
 * @param {string} variant - Biến thể (info, success, warning, error)
 * @param {number} duration - Thời gian hiển thị (ms)
 * @param {string} position - Vị trí trên màn hình (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center)
 * @param {function} onClose - Hàm xử lý khi đóng thông báo
 * @param {boolean} isVisible - Trạng thái hiển thị
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {boolean} showIcon - Hiển thị icon hay không
 */
const Toast = ({
  children,
  variant = 'info',
  duration = 3000,
  position = 'top-right',
  onClose,
  isVisible = true,
  className = '',
  showIcon = true,
  ...rest
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  // Xác định icon tương ứng với variant
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon} aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon} aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon} aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon} aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  // Xác định class position tương ứng
  const getPositionClass = () => {
    switch (position) {
      case 'top-left':
        return styles.topLeft;
      case 'top-center':
        return styles.topCenter;
      case 'bottom-right':
        return styles.bottomRight;
      case 'bottom-left':
        return styles.bottomLeft;
      case 'bottom-center':
        return styles.bottomCenter;
      case 'top-right':
      default:
        return styles.topRight;
    }
  };

  // Xử lý đóng toast
  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  // Tạo component toast
  const toastElement = (
    <div
      className={`
        ${styles.toast}
        ${styles[`toast-${variant}`]}
        ${getPositionClass()}
        ${visible ? styles.visible : styles.hidden}
        ${className}
      `}
      role="alert"
      aria-live="assertive"
      {...rest}
    >
      {showIcon && <div className={styles.iconWrapper}>{getIcon()}</div>}
      
      <div className={styles.content}>
        {children}
      </div>
      
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );

  // Sử dụng React Portal để render toast ở cuối body
  return visible ? ReactDOM.createPortal(
    toastElement,
    document.body
  ) : null;
};

export default Toast;