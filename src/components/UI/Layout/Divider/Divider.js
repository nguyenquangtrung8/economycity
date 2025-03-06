// src/components/UI/Layout/Divider/Divider.js
import React from 'react';
import styles from './Divider.module.css';

/**
 * Divider component to separate content
 * @param {string} className - Additional CSS classes
 * @param {string} orientation - Divider orientation (horizontal, vertical)
 * @param {string} size - Divider thickness (thin, regular, thick)
 * @param {string} color - Divider color
 * @param {string} margin - Margin around divider (sm, md, lg)
 */
const Divider = ({
  className = '',
  orientation = 'horizontal',
  size = 'regular',
  color,
  margin = 'md',
  ...rest
}) => {
  const dividerStyle = color ? { backgroundColor: color } : {};
  
  return (
    <div
      className={`
        ${styles.divider}
        ${styles[orientation]}
        ${styles[`size-${size}`]}
        ${styles[`margin-${margin}`]}
        ${className}
      `}
      style={dividerStyle}
      role="separator"
      {...rest}
    />
  );
};

export default Divider;