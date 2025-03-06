// src/components/UI/DataDisplay/Progress/Progress.js
import React from 'react';
import styles from './Progress.module.css';

/**
 * Progress component - Hiển thị thanh tiến trình
 * @param {number} value - Giá trị hiện tại
 * @param {number} max - Giá trị tối đa
 * @param {string} className - Class bổ sung
 * @param {string} color - Màu sắc (primary, secondary, success, warning, danger)
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {boolean} showLabel - Hiển thị label
 * @param {string} labelPosition - Vị trí của label (inside, outside)
 * @param {string} labelFormat - Format của label (callback hoặc string, ví dụ: "{value}%")
 * @param {string} variant - Kiểu hiển thị (line, circle)
 * @param {boolean} striped - Có sọc (chỉ áp dụng cho variant line)
 * @param {boolean} animated - Có animation (chỉ áp dụng cho variant line và striped=true)
 */
const Progress = ({
  value = 0,
  max = 100,
  className = '',
  color = 'primary',
  size = 'md',
  showLabel = true,
  labelPosition = 'inside',
  labelFormat,
  variant = 'line',
  striped = false,
  animated = false,
  ...rest
}) => {
  // Normalize value (ensure value is between 0 and max)
  const normalizedValue = Math.max(0, Math.min(value, max));
  
  // Calculate percentage
  const percentage = (normalizedValue / max) * 100;
  
  // Format label
  const getLabel = () => {
    if (typeof labelFormat === 'function') {
      return labelFormat(normalizedValue, max);
    }
    
    if (typeof labelFormat === 'string') {
      return labelFormat
        .replace('{value}', normalizedValue)
        .replace('{max}', max)
        .replace('{percentage}', Math.round(percentage));
    }
    
    return `${Math.round(percentage)}%`;
  };
  
  // Render circular progress
  if (variant === 'circle') {
    const radius = 42; // SVG circle radius
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div 
        className={`
          ${styles.circleContainer}
          ${styles[`size-${size}`]}
          ${styles[`color-${color}`]}
          ${className}
        `}
        {...rest}
      >
        <svg viewBox="0 0 100 100" className={styles.circleSvg}>
          {/* Background circle */}
          <circle
            className={styles.circleBackground}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <circle
            className={styles.circleProgress}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        
        {showLabel && (
          <div className={styles.circleLabel}>
            {getLabel()}
          </div>
        )}
      </div>
    );
  }

  // Render line progress (default)
  return (
    <div className={`${styles.container} ${className}`} {...rest}>
      <div 
        className={`
          ${styles.progressBar}
          ${styles[`size-${size}`]}
          ${styles[`color-${color}`]}
          ${striped ? styles.striped : ''}
          ${animated && striped ? styles.animated : ''}
        `}
      >
        <div 
          className={styles.progressFill} 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={normalizedValue}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          {showLabel && labelPosition === 'inside' && (
            <span className={styles.label}>{getLabel()}</span>
          )}
        </div>
      </div>
      
      {showLabel && labelPosition === 'outside' && (
        <div className={styles.outsideLabel}>{getLabel()}</div>
      )}
    </div>
  );
};

export default Progress;