import React from 'react';
import styles from './FileInput.module.css';

/**
 * FileInput component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const FileInput = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={`${styles.fileInput} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default FileInput;
