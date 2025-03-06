// src/components/UI/Feedback/Skeleton/Skeleton.js
import React from 'react';
import styles from './Skeleton.module.css';

/**
 * Skeleton component - Loading placeholder
 * @param {string} variant - Biến thể (text, rectangle, circle, avatar, card, etc.)
 * @param {string|number} width - Chiều rộng
 * @param {string|number} height - Chiều cao
 * @param {string} animation - Kiểu animation (pulse, wave, none)
 * @param {number} count - Số lượng placeholder (cho variant text)
 * @param {string} className - Class bổ sung từ bên ngoài
 */
const Skeleton = ({
  variant = 'rectangle',
  width,
  height,
  animation = 'pulse',
  count = 1,
  className = '',
  ...rest
}) => {
  // Tạo style từ width và height
  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  // Hàm render multiple text lines
  const renderTextLines = () => {
    return Array(count)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className={`
            ${styles.skeleton} 
            ${styles.text} 
            ${styles[`animation-${animation}`]}
            ${index !== count - 1 ? styles.lastLine : ''}
          `}
          style={{
            ...style,
            width: index === count - 1 && count > 1 ? '80%' : width || undefined,
          }}
          {...rest}
        />
      ));
  };

  // Nếu là dạng text, render nhiều dòng
  if (variant === 'text') {
    return <div className={className}>{renderTextLines()}</div>;
  }

  // Render card skeleton
  if (variant === 'card') {
    return (
      <div 
        className={`${styles.card} ${className}`} 
        style={style}
        {...rest}
      >
        <div className={`${styles.skeleton} ${styles.rectangle} ${styles[`animation-${animation}`]}`} style={{ height: '200px' }} />
        <div className={styles.cardContent}>
          <div className={`${styles.skeleton} ${styles.text} ${styles[`animation-${animation}`]}`} style={{ marginBottom: '0.5rem', height: '1.5rem' }} />
          <div className={`${styles.skeleton} ${styles.text} ${styles[`animation-${animation}`]}`} style={{ width: '90%', marginBottom: '0.5rem' }} />
          <div className={`${styles.skeleton} ${styles.text} ${styles[`animation-${animation}`]}`} style={{ width: '80%' }} />
        </div>
      </div>
    );
  }

  // Render avatar skeleton
  if (variant === 'avatar') {
    return (
      <div 
        className={`
          ${styles.skeleton} 
          ${styles.circle} 
          ${styles[`animation-${animation}`]}
          ${className}
        `} 
        style={style || { width: '48px', height: '48px' }}
        {...rest}
      />
    );
  }

  // Mặc định render rectangle hoặc circle
  return (
    <div 
      className={`
        ${styles.skeleton} 
        ${styles[variant]} 
        ${styles[`animation-${animation}`]}
        ${className}
      `} 
      style={style}
      {...rest}
    />
  );
};

export default Skeleton;