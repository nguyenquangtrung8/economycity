// src/components/UI/Feedback/Modal/Modal.js
import React, { useEffect } from 'react';
import styles from './Modal.module.css';

/**
 * Modal component - Dialog overlay
 * @param {ReactNode} children - Nội dung hiển thị trong modal
 * @param {boolean} isOpen - Trạng thái hiển thị của modal
 * @param {function} onClose - Hàm xử lý khi đóng modal
 * @param {string} title - Tiêu đề modal
 * @param {ReactNode} footer - Nội dung phần footer của modal
 * @param {string} size - Kích thước modal (sm, md, lg)
 * @param {boolean} closeOnEsc - Đóng modal khi nhấn phím Esc
 * @param {boolean} closeOnOutsideClick - Đóng modal khi click bên ngoài
 * @param {string} className - Class bổ sung từ bên ngoài
 */
const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  footer,
  size = 'md',
  closeOnEsc = true,
  closeOnOutsideClick = true,
  className = '',
  ...rest
}) => {
  // Xử lý đóng modal khi nhấn phím Esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      // Thêm event listener khi modal mở
      document.addEventListener('keydown', handleKeyDown);
      // Khóa scroll của body
      document.body.style.overflow = 'hidden';
    }
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Khôi phục scroll của body khi component unmount hoặc modal đóng
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, closeOnEsc, onClose]);

  // Nếu modal không mở, không render gì cả
  if (!isOpen) return null;

  // Xử lý click bên ngoài modal
  const handleOutsideClick = (event) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.overlay} 
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        className={`${styles.modal} ${styles[`modal-${size}`]} ${className}`}
        {...rest}
      >
        {/* Header */}
        {title && (
          <div className={styles.header}>
            <h2 id="modal-title" className={styles.title}>{title}</h2>
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        
        {/* Body */}
        <div className={styles.body}>
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;