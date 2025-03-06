// src/components/UI/Feedback/Popover/Popover.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './Popover.module.css';

/**
 * Popover component - Nội dung popup
 * @param {ReactNode} children - Trigger element
 * @param {ReactNode} content - Nội dung hiển thị trong popover
 * @param {string} placement - Vị trí (top, right, bottom, left, top-start, top-end, etc.)
 * @param {string} trigger - Sự kiện kích hoạt (click, hover)
 * @param {boolean} isOpen - Trạng thái hiển thị (controlled mode)
 * @param {function} onOpenChange - Hàm xử lý khi thay đổi trạng thái mở
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} title - Tiêu đề của popover (optional)
 * @param {boolean} arrow - Hiển thị mũi tên hay không
 */
const Popover = ({
  children,
  content,
  placement = 'bottom',
  trigger = 'click',
  isOpen: controlledIsOpen,
  onOpenChange,
  className = '',
  title,
  arrow = true,
  ...rest
}) => {
  // State cho uncontrolled mode
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  // Xác định mode (controlled vs uncontrolled)
  const isControlled = controlledIsOpen !== undefined;
  
  // State hiện tại dựa vào mode
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  // Refs
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Xử lý thay đổi trạng thái
  const handleToggle = () => {
    if (isControlled) {
      onOpenChange && onOpenChange(!isOpen);
    } else {
      setUncontrolledIsOpen(!isOpen);
    }
  };
  
  // Xử lý sự kiện mouseenter/mouseleave (hover)
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      clearTimeout(timeoutRef.current);
      
      if (isControlled) {
        onOpenChange && onOpenChange(true);
      } else {
        setUncontrolledIsOpen(true);
      }
    }
  };
  
  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(() => {
        if (isControlled) {
          onOpenChange && onOpenChange(false);
        } else {
          setUncontrolledIsOpen(false);
        }
      }, 300);
    }
  };
  
  // Xử lý click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        trigger === 'click' &&
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target) &&
        !popoverRef.current.contains(event.target)
      ) {
        if (isControlled) {
          onOpenChange && onOpenChange(false);
        } else {
          setUncontrolledIsOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutRef.current);
    };
  }, [isOpen, trigger, isControlled, onOpenChange]);
  
  // Tính toán position
  useEffect(() => {
    if (isOpen && triggerRef.current && popoverRef.current) {
      const updatePosition = () => {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;
        
        switch (placement) {
          case 'top':
            top = triggerRect.top - popoverRect.height - 8;
            left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
            break;
          
          case 'right':
            top = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
            left = triggerRect.right + 8;
            break;
          
          case 'bottom':
            top = triggerRect.bottom + 8;
            left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
            break;
          
          case 'left':
            top = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2);
            left = triggerRect.left - popoverRect.width - 8;
            break;
            
          case 'top-start':
            top = triggerRect.top - popoverRect.height - 8;
            left = triggerRect.left;
            break;
            
          case 'top-end':
            top = triggerRect.top - popoverRect.height - 8;
            left = triggerRect.right - popoverRect.width;
            break;
            
          case 'bottom-start':
            top = triggerRect.bottom + 8;
            left = triggerRect.left;
            break;
            
          case 'bottom-end':
            top = triggerRect.bottom + 8;
            left = triggerRect.right - popoverRect.width;
            break;
            
          case 'right-start':
            top = triggerRect.top;
            left = triggerRect.right + 8;
            break;
            
          case 'right-end':
            top = triggerRect.bottom - popoverRect.height;
            left = triggerRect.right + 8;
            break;
            
          case 'left-start':
            top = triggerRect.top;
            left = triggerRect.left - popoverRect.width - 8;
            break;
            
          case 'left-end':
            top = triggerRect.bottom - popoverRect.height;
            left = triggerRect.left - popoverRect.width - 8;
            break;
        }
        
        // Đảm bảo popover không vượt ra ngoài màn hình
        const padding = 10;
        
        // Xử lý chiều ngang
        if (left < padding) {
          left = padding;
        } else if (left + popoverRect.width + padding > window.innerWidth) {
          left = window.innerWidth - popoverRect.width - padding;
        }
        
        // Xử lý chiều dọc
        if (top < padding) {
          top = padding;
        } else if (top + popoverRect.height + padding > window.innerHeight) {
          top = window.innerHeight - popoverRect.height - padding;
        }
        
        // Cập nhật vị trí
        popoverRef.current.style.top = `${top}px`;
        popoverRef.current.style.left = `${left}px`;
      };
      
      // Cập nhật vị trí ban đầu
      updatePosition();
      
      // Xử lý khi resize hoặc scroll
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isOpen, placement]);
  
  // Wrap children với event handlers
  const triggerElement = React.cloneElement(React.Children.only(children), {
    ref: triggerRef,
    onClick: trigger === 'click' ? handleToggle : undefined,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    'aria-haspopup': true,
    'aria-expanded': isOpen
  });
  
  return (
    <>
      {triggerElement}
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`${styles.popover} ${styles[`placement-${placement}`]} ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="tooltip"
          {...rest}
        >
          {arrow && (
            <div className={`${styles.arrow} ${styles[`arrow-${placement}`]}`} />
          )}
          
          {title && (
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
            </div>
          )}
          
          <div className={styles.body}>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Popover;