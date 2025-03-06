// src/components/UI/Feedback/Tooltip/Tooltip.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

/**
 * Tooltip Component - Hiển thị thông tin bổ sung khi hover hoặc focus vào một element
 * @param {ReactNode} children - Element trigger cho tooltip
 * @param {ReactNode} content - Nội dung hiển thị trong tooltip
 * @param {string} placement - Vị trí hiển thị (top, right, bottom, left)
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} variant - Biến thể (dark, light, info, warning)
 * @param {number} delay - Thời gian delay trước khi hiện tooltip (ms)
 * @param {boolean} arrow - Hiển thị mũi tên chỉ hướng
 * @param {string} maxWidth - Chiều rộng tối đa của tooltip
 * @param {boolean} interactive - Cho phép tương tác với nội dung tooltip
 */
const Tooltip = ({
  children,
  content,
  placement = 'top',
  className = '',
  variant = 'dark',
  delay = 300,
  arrow = true,
  maxWidth = '250px',
  interactive = false,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  // Tính toán vị trí tooltip dựa trên placement
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    let top = 0;
    let left = 0;
    
    switch(placement) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollX + 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      default:
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
    }
    
    // Đảm bảo tooltip không bị tràn ra ngoài viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Ngăn tràn qua phải
    if (left + tooltipRect.width > viewportWidth - 8) {
      left = viewportWidth - tooltipRect.width - 8;
    }
    
    // Ngăn tràn qua trái
    if (left < 8) {
      left = 8;
    }
    
    // Ngăn tràn xuống dưới
    if (top + tooltipRect.height > viewportHeight + scrollY - 8) {
      top = triggerRect.top + scrollY - tooltipRect.height - 8;
    }
    
    // Ngăn tràn lên trên
    if (top < scrollY + 8) {
      top = triggerRect.bottom + scrollY + 8;
    }
    
    setPosition({ top, left });
  };

  // Xử lý show tooltip
  const handleShowTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Sau khi tooltip hiển thị, tính toán vị trí
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  // Xử lý hide tooltip
  const handleHideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };
  
  // Cập nhật vị trí tooltip khi window resize
  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isVisible]);

  // Cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Clone và thêm ref, event handlers vào children
  const triggerElement = React.cloneElement(
    React.Children.only(children),
    {
      ref: triggerRef,
      onMouseEnter: handleShowTooltip,
      onMouseLeave: handleHideTooltip,
      onFocus: handleShowTooltip,
      onBlur: handleHideTooltip,
      'aria-describedby': isVisible ? 'tooltip' : undefined,
      ...children.props
    }
  );
  
  return (
    <>
      {triggerElement}
      
      {isVisible && (
        <div 
          id="tooltip"
          role="tooltip"
          ref={tooltipRef}
          className={`
            ${styles.tooltip} 
            ${styles[`tooltip-${variant}`]} 
            ${styles[`placement-${placement}`]}
            ${arrow ? styles.hasArrow : ''}
            ${className}
          `}
          style={{ 
            top: `${position.top}px`, 
            left: `${position.left}px`,
            maxWidth
          }}
          onMouseEnter={interactive ? handleShowTooltip : undefined}
          onMouseLeave={interactive ? handleHideTooltip : undefined}
          {...rest}
        >
          <div className={styles.tooltipContent}>
            {content}
          </div>
          {arrow && (
            <div className={`${styles.arrow} ${styles[`arrow-${placement}`]}`} />
          )}
        </div>
      )}
    </>
  );
};

export default Tooltip;