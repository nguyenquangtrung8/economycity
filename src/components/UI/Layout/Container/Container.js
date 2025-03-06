// src/components/UI/Layout/Container/Container.js
import React from 'react';
import styles from './Container.module.css';

/**
 * Container component that centers content with a max width
 * @param {ReactNode} children - The content to be contained
 * @param {string} className - Additional CSS classes
 * @param {boolean} fluid - Whether the container should be full width
 * @param {React.ElementType} as - The HTML element to render as
 * @param {boolean} center - Whether to center the content horizontally
 */
const Container = ({ 
  children, 
  className = '',
  fluid = false,
  as: Component = 'div',
  center = false,
  ...rest 
}) => {
  return (
    <Component 
      className={`
        ${styles.container} 
        ${fluid ? styles.containerFluid : ''} 
        ${center ? styles.containerCenter : ''}
        ${className}
      `} 
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;