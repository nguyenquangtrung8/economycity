// src/components/UI/DataDisplay/Statistic/Statistic.js
import React from 'react';
import styles from './Statistic.module.css';

/**
 * Statistic component - Hiển thị các số liệu thống kê
 * @param {string|number} value - Giá trị hiển thị
 * @param {string} title - Tiêu đề của thống kê
 * @param {string} className - Class bổ sung
 * @param {ReactNode} prefix - Phần tử hiển thị trước giá trị
 * @param {ReactNode} suffix - Phần tử hiển thị sau giá trị
 * @param {ReactNode} icon - Icon đi kèm
 * @param {string} iconPosition - Vị trí của icon (left, top, right)
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {string} valueStyle - Style cho phần giá trị
 * @param {string} titleStyle - Style cho phần tiêu đề
 * @param {string} trend - Xu hướng (up, down, neutral)
 * @param {Function} formatter - Hàm định dạng giá trị
 */
const Statistic = ({
  value,
  title,
  className = '',
  prefix,
  suffix,
  icon,
  iconPosition = 'left',
  size = 'md',
  valueStyle,
  titleStyle,
  trend,
  formatter,
  ...rest
}) => {
  // Format giá trị nếu có formatter
  const formattedValue = formatter ? formatter(value) : value;
  
  // Render icon với trend nếu có
  const renderIcon = () => {
    if (!icon && !trend) return null;
    
    let trendIcon = null;
    
    if (trend === 'up') {
      trendIcon = (
        <svg 
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          className={`${styles.trendIcon} ${styles.trendUp}`}
          aria-hidden="true"
        >
          <path d="M7 14l5-5 5 5z" fill="currentColor" />
        </svg>
      );
    } else if (trend === 'down') {
      trendIcon = (
        <svg 
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          className={`${styles.trendIcon} ${styles.trendDown}`}
          aria-hidden="true"
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor" />
        </svg>
      );
    }
    
    return (
      <span className={styles.icon}>
        {icon || trendIcon}
      </span>
    );
  };

  return (
    <div 
      className={`
        ${styles.statistic}
        ${styles[`size-${size}`]}
        ${styles[`icon-${iconPosition}`]}
        ${trend ? styles[`trend-${trend}`] : ''}
        ${className}
      `}
      {...rest}
    >
      {iconPosition === 'top' && renderIcon()}
      
      {title && (
        <div className={styles.title} style={titleStyle}>
          {iconPosition === 'left' && renderIcon()}
          <span>{title}</span>
        </div>
      )}
      
      <div className={styles.valueWrapper} style={valueStyle}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        {iconPosition === 'value-left' && renderIcon()}
        <span className={styles.value}>{formattedValue}</span>
        {iconPosition === 'value-right' && renderIcon()}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    </div>
  );
};

export default Statistic;