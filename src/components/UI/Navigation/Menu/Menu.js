// src/components/UI/Navigation/Menu/Menu.js
import React, { useState } from 'react';
import styles from './Menu.module.css';

/**
 * Menu Component - Hiển thị menu với các mục và nhóm
 * @param {Array} items - Mảng các menu items
 * @param {Function} onSelect - Handler khi chọn item
 * @param {Array} defaultSelectedKeys - Mảng các key được chọn mặc định
 * @param {string} mode - Chế độ hiển thị (horizontal, vertical)
 * @param {string} className - Class bổ sung từ bên ngoài
 */
const Menu = ({
  items = [],
  onSelect,
  defaultSelectedKeys = [],
  mode = 'vertical',
  className = '',
  ...rest
}) => {
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);

  const handleItemClick = (item) => {
    if (item.disabled) return;

    const newSelectedKeys = [item.key];
    setSelectedKeys(newSelectedKeys);

    if (onSelect) {
      onSelect(item.key, item);
    }

    if (item.onClick) {
      item.onClick(item);
    }
  };

  const renderMenuItem = (item) => {
    const isSelected = selectedKeys.includes(item.key);
    
    return (
      <li
        key={item.key}
        className={`
          ${styles.menuItem}
          ${isSelected ? styles.selected : ''}
          ${item.disabled ? styles.disabled : ''}
        `}
        onClick={() => handleItemClick(item)}
      >
        {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
        <span className={styles.itemText}>{item.label}</span>
      </li>
    );
  };

  const renderSubMenu = (subMenu) => {
    return (
      <li key={subMenu.key} className={styles.subMenu}>
        <div className={styles.subMenuTitle}>
          {subMenu.icon && <span className={styles.itemIcon}>{subMenu.icon}</span>}
          <span className={styles.itemText}>{subMenu.label}</span>
          <span className={styles.expandIcon}>▼</span>
        </div>
        <ul className={styles.subMenuItems}>
          {subMenu.children.map((child) => 
            child.children ? renderSubMenu(child) : renderMenuItem(child)
          )}
        </ul>
      </li>
    );
  };

  return (
    <ul
      className={`
        ${styles.menu}
        ${styles[`menu-${mode}`]}
        ${className}
      `}
      role="menu"
      {...rest}
    >
      {items.map((item) => (
        item.children ? renderSubMenu(item) : renderMenuItem(item)
      ))}
    </ul>
  );
};

export default Menu;