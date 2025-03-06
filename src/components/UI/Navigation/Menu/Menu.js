import React from 'react';
import styles from './Menu.module.css';

/**
 * Menu component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const Menu = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.menu} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Menu;
