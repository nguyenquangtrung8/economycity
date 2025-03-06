// src/components/UI/Layout/Box/Box.js
import React from 'react';
import styles from './Box.module.css';

/**
 * Box component - basic layout building block with spacing options
 * @param {ReactNode} children - The content of the box
 * @param {string} className - Additional CSS classes
 * @param {string} padding - Padding size (none, sm, md, lg)
 * @param {string} margin - Margin size (none, sm, md, lg)
 * @param {string} background - Background color
 * @param {boolean} shadow - Whether to add shadow
 * @param {boolean} rounded - Whether to add border radius
 * @param {React.ElementType} as - The HTML element to render as
 */
const Box = ({
  children,
  className = '',
  padding = 'md',
  margin = 'none',
  background,
  shadow = false,
  rounded = false,
  as: Component = 'div',
  ...rest
}) => {
  const boxStyle = background ? { backgroundColor: background } : {};
  
  return (
    <Component
      className={`
        ${styles.box}
        ${styles[`padding-${padding}`]}
        ${styles[`margin-${margin}`]}
        ${shadow ? styles.shadow : ''}
        ${rounded ? styles.rounded : ''}
        ${className}
      `}
      style={boxStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Box;