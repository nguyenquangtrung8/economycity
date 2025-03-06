// src/components/UI/Typography/Title/Title.js
import React from 'react';
import styles from './Title.module.css';

/**
 * Title component - Hiển thị tiêu đề với nhiều cấp độ (h1-h6)
 * @param {ReactNode} children - Nội dung hiển thị bên trong tiêu đề
 * @param {number} level - Cấp độ heading (1-6, mặc định: 2)
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} align - Căn chỉnh text (left, center, right)
 * @param {string} color - Màu sắc custom (sử dụng CSS variables)
 * @param {boolean} gutterBottom - Có thêm margin-bottom hay không
 */
const Title = ({ 
  children,
  level = 2,
  className = '',
  align = 'left',
  color,
  gutterBottom = true,
  ...rest
}) => {
  // Đảm bảo level trong khoảng hợp lệ từ 1-6
  const validLevel = Math.min(Math.max(1, level), 6);
  
  // Tạo động component heading (h1-h6) dựa vào level
  const HeadingTag = `h${validLevel}`;
  
  // Style động
  const styles2 = {
    color: color,
  };
  
  return (
    <HeadingTag
      className={`
        ${styles.title}
        ${styles[`title-h${validLevel}`]}
        ${styles[`align-${align}`]}
        ${gutterBottom ? styles.gutterBottom : ''}
        ${className}
      `}
      style={color ? styles2 : undefined}
      {...rest}
    >
      {children}
    </HeadingTag>
  );
};

export default Title;