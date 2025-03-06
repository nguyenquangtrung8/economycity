// src/components/UI/Media/Accordion/Accordion.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

/**
 * Accordion Item Component
 * @param {string} title - Tiêu đề của accordion item
 * @param {ReactNode} children - Nội dung của accordion item
 * @param {boolean} isOpen - Trạng thái mở/đóng
 * @param {Function} onToggle - Handler khi toggle
 * @param {string} id - ID duy nhất cho accordion item
 */
const AccordionItem = ({ 
  title, 
  children, 
  isOpen, 
  onToggle, 
  id,
  ...rest
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  // Cập nhật chiều cao khi nội dung thay đổi hoặc isOpen thay đổi
  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  return (
    <div 
      className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}
      {...rest}
    >
      <button
        className={styles.accordionHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <h3 className={styles.accordionTitle}>{title}</h3>
        <span className={styles.accordionIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div 
        className={styles.accordionContent}
        style={{ height: `${height}px` }}
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
      >
        <div 
          className={styles.accordionBody}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion Component - Panel có thể mở rộng/thu gọn (FAQ)
 * @param {Array} items - Mảng các accordion items, mỗi item có dạng { id, title, content }
 * @param {string|Array} defaultActiveKey - Key mặc định được mở
 * @param {boolean} multiple - Cho phép nhiều panel mở cùng lúc
 * @param {Function} onChange - Handler khi thay đổi trạng thái
 * @param {boolean} bordered - Có border giữa các item
 * @param {string} className - Class bổ sung
 */
const Accordion = ({ 
  items = [], 
  defaultActiveKey = '', 
  multiple = false,
  onChange,
  bordered = true,
  className = '',
  ...rest
}) => {
  // Khởi tạo state với defaultActiveKey
  const [activeKeys, setActiveKeys] = useState(() => {
    if (multiple) {
      return Array.isArray(defaultActiveKey) ? defaultActiveKey : defaultActiveKey ? [defaultActiveKey] : [];
    } else {
      return defaultActiveKey || '';
    }
  });

  const toggleItem = (itemKey) => {
    let newActiveKeys;
    
    if (multiple) {
      if (activeKeys.includes(itemKey)) {
        newActiveKeys = activeKeys.filter(key => key !== itemKey);
      } else {
        newActiveKeys = [...activeKeys, itemKey];
      }
    } else {
      newActiveKeys = activeKeys === itemKey ? '' : itemKey;
    }
    
    setActiveKeys(newActiveKeys);
    
    if (onChange) {
      onChange(newActiveKeys);
    }
  };

  const isItemActive = (itemKey) => {
    if (multiple) {
      return activeKeys.includes(itemKey);
    } else {
      return activeKeys === itemKey;
    }
  };

  return (
    <div 
      className={`${styles.accordion} ${bordered ? styles.bordered : ''} ${className}`}
      {...rest}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={isItemActive(item.id)}
          onToggle={() => toggleItem(item.id)}
        >
          {typeof item.content === 'function' ? item.content() : item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;