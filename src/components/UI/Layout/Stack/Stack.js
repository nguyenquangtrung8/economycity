// src/components/UI/Layout/Stack/Stack.js
import React from 'react';
import styles from './Stack.module.css';

/**
 * Stack component for vertical spacing between elements
 * @param {ReactNode} children - Elements to be stacked
 * @param {string} className - Additional CSS classes
 * @param {string} spacing - Spacing between items (sm, md, lg)
 * @param {boolean} dividers - Whether to add dividers between items
 * @param {React.ElementType} as - The HTML element to render as
 */
const Stack = ({
  children,
  className = '',
  spacing = 'md',
  dividers = false,
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component
      className={`
        ${styles.stack}
        ${styles[`stack-spacing-${spacing}`]}
        ${dividers ? styles.withDividers : ''}
        ${className}
      `}
      {...rest}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return (
          <div key={index} className={styles.stackItem}>
            {child}
          </div>
        );
      })}
    </Component>
  );
};

export default Stack;