// src/components/UI/Layout/Section/Section.js
import React from 'react';
import styles from './Section.module.css';

/**
 * Section component for different sections of a page
 * @param {ReactNode} children - The content of the section
 * @param {string} className - Additional CSS classes
 * @param {string} id - ID for navigation/anchor links
 * @param {string} backgroundColor - Background color of the section
 * @param {string} size - Size of the section (sm, md, lg)
 * @param {boolean} fullWidth - Whether the section should be full width
 */
const Section = ({
  children,
  className = '',
  id,
  backgroundColor,
  size = 'md',
  fullWidth = false,
  ...rest
}) => {
  const sectionStyle = backgroundColor ? { backgroundColor } : {};
  
  return (
    <section
      id={id}
      className={`${styles.section} ${styles['section-' + size]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      style={sectionStyle}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;