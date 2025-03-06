// src/components/UI/Layout/Flex/Flex.js
import React from 'react';
import styles from './Flex.module.css';

/**
 * Flex component for creating flexible layouts
 * @param {ReactNode} children - The flex items
 * @param {string} className - Additional CSS classes
 * @param {string} direction - Flex direction (row, column)
 * @param {string} align - Align items (start, center, end, stretch)
 * @param {string} justify - Justify content (start, center, end, between, around)
 * @param {string} gap - Gap between flex items (sm, md, lg)
 * @param {boolean} wrap - Whether flex items should wrap
 * @param {React.ElementType} as - The HTML element to render as
 */
const Flex = ({
  children,
  className = '',
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component
      className={`
        ${styles.flex}
        ${styles[`flex-direction-${direction}`]}
        ${styles[`flex-align-${align}`]}
        ${styles[`flex-justify-${justify}`]}
        ${styles[`flex-gap-${gap}`]}
        ${wrap ? styles.flexWrap : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Flex;