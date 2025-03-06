// src/components/UI/Navigation/Dropdown/Dropdown.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

/**
 * Dropdown Component - Menu dropdown cho navigation và lựa chọn
 * @param {ReactNode} trigger - Element dùng để kích hoạt dropdown
 * @param {Array} items - Mảng các item của dropdown
 * @param {string} placement - Vị trí hiển thị (bottom, top, left, right)
 * @param {Function} onSelect - Hàm callback khi một item được chọn
 * @param {string} className - Class bổ sung
 * @param {boolean} disabled - Vô hiệu hóa dropdown
 * @param {boolean} closeOnSelect - Tự động đóng khi chọn item
 * @param {string} maxHeight - Chiều cao tối đa của dropdown menu
 * @param {string} minWidth - Chiều rộng tối thiểu của dropdown menu
 */
const Dropdown = ({ 
  trigger, 
  items = [], 
  placement = 'bottom', 
  onSelect, 
  className = '', 
  disabled = false, 
  closeOnSelect = true,
  maxHeight = '250px',
  minWidth = '180px',
  ...rest 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prevState => !prevState);
    }
  };
  
  // Handle item selection
  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close dropdown when pressing escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div 
      className={`${styles.dropdown} ${className}`} 
      ref={dropdownRef}
      {...rest}
    >
      {/* Trigger Element */}
      <div 
        className={`${styles.trigger} ${disabled ? styles.disabled : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {trigger}
        {!disabled && (
          <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>
            &#9662;
          </span>
        )}
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <ul 
          className={`${styles.menu} ${styles[`menu-${placement}`]}`} 
          style={{ maxHeight, minWidth }}
          role="menu"
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <li 
                key={item.id || index} 
                className={`${styles.item} ${item.disabled ? styles.itemDisabled : ''}`}
                onClick={() => !item.disabled && handleSelect(item)}
                role="menuitem"
                tabIndex={item.disabled ? -1 : 0}
                aria-disabled={item.disabled}
                onKeyDown={(e) => {
                  if (!item.disabled && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleSelect(item);
                  }
                }}
              >
                {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                <span className={styles.itemText}>{item.label}</span>
              </li>
            ))
          ) : (
            <li className={styles.emptyItem}>Không có mục nào</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;