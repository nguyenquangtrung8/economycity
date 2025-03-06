import React from 'react';
import styles from './NavLink.module.css';

/**
 * NavLink component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const NavLink = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.navLink} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default NavLink;
