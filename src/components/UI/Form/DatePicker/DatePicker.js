import React from 'react';
import styles from './DatePicker.module.css';

/**
 * DatePicker component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const DatePicker = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.datePicker} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DatePicker;
